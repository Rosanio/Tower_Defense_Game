precision mediump float;

//The object that fetches data from texture.
//Must be set outside the shader.
uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;

//Color of pixel
uniform vec4 uPixelColor;
uniform vec4 uGlobalAmbientColor;
uniform float uGlobalAmbientIntensity;

//for supporting a simple Phong-like illumination model
uniform vec3 uCameraPosition; // for computing the V-vector

//Material properties
struct Material {
    vec4 Ka;   // simple boosting of color
    vec4 Kd;   // Diffuse
    vec4 Ks;   // Specular
    float Shininess; // this is the "n"
};
uniform Material uMaterial;

//Light information
#define kGLSLuLightArraySize 4

#define ePointLight 0
#define eDirectionalLight 1
#define eSpotLight 2

struct Light {
    vec3 Position;
    vec3 Direction;
    vec4 Color;
    float Near;
    float Far;
    float CosInner;
    float CosOuter;
    float Intensity;
    float DropOff;
    bool IsOn;
    int LightType;
};

#define kMaxShadowOpacity 0.7
#define kLightStrengthCutoff 0.05

uniform Light uLights[kGLSLuLightArraySize];
    //Maximum array of lights this shader supports

varying vec2 vTexCoord;

float AngularDropOff(vec3 lgtDir, vec3 L) {
    float atten = 0.0;
    float cosL = dot(lgtDir, L);
    float num = cosL - uLights[0].CosOuter;
    if(num > 0.0) {
        if(cosL > uLights[0].CosInner) {
            atten = 1.0;
        } else {
            float denom = uLights[0].CosInner - uLights[0].CosOuter;
            atten = smoothstep(0.0, 1.0, pow(num/denom, uLights[0].DropOff));
        }
    }
    return atten;
}

float DistanceDropOff(float dist) {
    float atten = 0.0;
    if(dist <= uLights[0].Far) {
        if(dist <= uLights[0].Near) {
            atten = 1.0;
        } else {
            //simple qudratic drop off
            float n = dist - uLights[0].Near;
            float d = uLights[0].Far - uLights[0].Near;
            atten = smoothstep(0.0, 1.0, 1.0-(n*n)/(d*d)); //blended attenuation
        }
    }
    return atten;
}

float LightStrength() {
    float aAtten = 1.0, dAtten = 1.0;
    vec3 lgtDir = -normalize(uLights[0].Direction.xyz);
    vec3 L; //light vector
    float dist; //distant to light
    if(uLights[0].LightType == eDirectionalLight) {
        L = lgtDir;
    } else {
        L = uLights[0].Position.xyz - gl_FragCoord.xyz;
        dist = length(L);
        L = L / dist;
    }
    if(uLights[0].LightType == eSpotLight) {
        //spotlight: do angle dropoff
        aAtten = AngularDropOff(lgtDir, L);
    }
    if(uLights[0].LightType != eDirectionalLight) {
        //both spot and point light have dist dropoff
        dAtten = DistanceDropOff(dist);
    }
    float result = aAtten * dAtten;
    return result;
}

void main(void) {
    vec4 texFragColor = texture2D(uSampler, vTexCoord);
    float lgtStrength = LightStrength();
    if(lgtStrength < kLightStrengthCutoff)
        discard;
    vec3 shadowColor = lgtStrength * uPixelColor.rgb;
    shadowColor *= uPixelColor.a * texFragColor.a;
    gl_FragColor = vec4(shadowColor, kMaxShadowOpacity * lgtStrength * texFragColor.a);
}

