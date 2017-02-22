precision mediump float;

//The object that fetches data from texture.
uniform sampler2D uSampler;

//Color of pixel
uniform vec4 uPixelColor;
uniform vec4 uGlobalAmbientColor;
uniform float uGlobalAmbientIntensity;

//Light information
#define kGLSLuLightArraySize 4
    //GLSL Fragment shader requires loop control
    //variable to always be a constant number. This number 4
    //says, this fragment shader will _ALWAYS_ process
    //all 4 light sources
    // *******WARNING*******
    //This number must correspond to the constant with the same name defined in LightShader.js file
    // *******WARNING*******
    //To change this number MAKE SURE: to update the 
    //    kGLSLLightArraySize
    //defined in LightShader.js file

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
uniform Light uLights[kGLSLuLightArraySize];

varying vec2 vTexCoord;

float AngularDropOff(Light lgt, vec3 lgtDir, vec3 L) {
    float atten = 0.0;
    float cosL = dot(lgtDir, L);
    float num = cosL - lgt.CosOuter;
    if(num > 0.0) {
        if(cosL > lgt.CosInner) {
            atten = 1.0;
        } else {
            float denom = lgt.CosInner - lgt.CosOuter;
            atten = smoothstep(0.0, 1.0, pow(num/denom, lgt.DropOff));
        }
    }
    return atten;
}

float DistanceDropOff(Light lgt, float dist) {
    float atten = 0.0;
    if(dist <= lgt.Far) {
        if(dist <= lgt.Near) {
            atten = 1.0;  //no attenuation
        } else {
            //simple quadratic drop off
            float n = dist - lgt.Near;
            float d = lgt.Far - lgt.Near;
            atten = smoothstep(0.0, 1.0, 1.0-(n*n)/(d*d)); //blended attenuation
        }
    }
    return atten;
}

vec4 LightEffect(Light lgt) {
    float aAtten = 1.0, dAtten = 1.0;
    if(lgt.LightType != eDirectionalLight) {
        vec3 lgtDir = -normalize(lgt.Direction.xyz);
        vec3 L = lgt.Position.xyz - gl_FragCoord.xyz;
        float dist = length(L);
        L = L / dist;

        //find out what kind of light...
        if(lgt.LightType == eSpotLight) {
            aAtten = AngularDropOff(lgt, lgtDir, L);
        }
        dAtten = DistanceDropOff(lgt, dist);
    }
    return dAtten * aAtten * lgt.Intensity * lgt.Color;
}

void main(void) {
    vec4 textureMapColor = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));
    vec4 lgtResults = uGlobalAmbientIntensity * uGlobalAmbientColor;

    //now decide if we should illuminate by the light
    if(textureMapColor.a > 0.0) {
        for(int i = 0; i < kGLSLuLightArraySize; i++) {
            if(uLights[i].IsOn) {
                lgtResults += LightEffect(uLights[i]);
            }
        }
    }
    lgtResults *= textureMapColor;

    //tint the textured area, and leave transparent area as defined by the texture
    vec3 r = vec3(lgtResults) * (1.0-uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    vec4 result = vec4(r, lgtResults.a);

    gl_FragColor = result;
}
