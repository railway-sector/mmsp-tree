const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HUDMaterial.glsl-BhR2_4Is.js","assets/index-D4B0nWYv.js","assets/index-CZOZycgy.css","assets/oitResolution.glsl-BA_xBdPi.js","assets/NoParameters-DB-WZ6gy.js","assets/ShaderBuilder-H3U2wzCg.js","assets/OutputColorHighlightOLID.glsl-C5mfN3LR.js","assets/Indices-eM4qXK7i.js","assets/Attribute-DGhdp5lO.js","assets/BufferView-mAQUkbGy.js","assets/ray-DGZ3bTid.js","assets/vectorStacks-Bdkz3gne.js","assets/quatf64-aQ5IuZRd.js","assets/lineSegment-BwT1Ar7w.js","assets/VertexAttributeLocations-Ig1ARTdr.js","assets/VertexElementDescriptor-CVzmm3VW.js","assets/renderState-C9OPedUa.js","assets/frustum-DYO2uDQl.js","assets/plane-VJHk2cJc.js","assets/sphere-BTcgM76Z.js","assets/RibbonLine.glsl-gnOVG4TW.js","assets/computeTranslationToOriginAndRotation-CO3V3ZIG.js","assets/localRotationUtils-B2UpL0eW.js","assets/WebGLLayer-CujImDTG.js","assets/mathUtils-p2_YiteE.js","assets/Octree-CjV9dlMF.js","assets/InterleavedLayout-DNmNP7rp.js","assets/MixExternalColor.glsl-DInimqAq.js","assets/projectVectorToVector-XE5j7tsm.js","assets/projectPointToVector-Bkm9nytZ.js","assets/dehydratedPoint-Z5ONvFg_.js","assets/orientedBoundingBox-CrJM1fvA.js","assets/quat-B1NJio_j.js","assets/RenderingContext-BXOi6OFu.js","assets/ProgramCache-D1ful-p8.js","assets/VertexArrayObject-QI3xpkxu.js","assets/VertexBuffer-CzYjdnNw.js"])))=>i.map(i=>d[i]);
import{w as ft,b2 as dt,A as ut,f9 as pt,su as ht,bs as vt,$ as h,a2 as ue,_ as Me,a1 as ee,dq as mt,r2 as xt,sv as gt,hX as pe,kV as he,ox as Ot,iS as Ct,fK as Oe,ff as G,f_ as Y,cJ as Ce,fc as St,fd as k,hi as Se,jP as be,jC as te,cA as bt,cV as j,fg as Q,h$ as wt,dV as yt,g2 as zt,bR as $t,v as R,pC as we,or as Pt,r_ as Be,jf as ve,cT as At,cG as Vt,ev as _t,c2 as Ft,cB as Dt,cx as Et}from"./index-D4B0nWYv.js";import{u as Rt}from"./hydratedFeatures-Dory8EHU.js";import{i as Ut,Q as Tt}from"./BufferView-mAQUkbGy.js";import{f as It,D as jt,K as q,L as ye,M as Mt,N as He,O as K,i as Le,t as qe,S as Bt,u as Ht,d as Lt,b as qt,c as Gt,e as ae,P as kt,y as ce,Q as ze,R as Nt,g as Wt,k as Yt,o as Xt,T as Qt,U as Kt,s as Zt,V as N,W as Jt,X as ea,Y as ta,x as re,Z as aa,_ as ra,$ as sa,a0 as oa,a1 as ia,a2 as $e,a3 as Pe,a4 as na,a5 as se,a6 as la,a7 as ca}from"./OutputColorHighlightOLID.glsl-C5mfN3LR.js";import{d as fa,r as da,a as ua,l as pa,b as ha}from"./BooleanBindUniform-BCwhFJYA.js";import{s as Ge,e as ke,i as Ne,o as va,a as We,u as ma,b as W,c as oe,t as xa}from"./MixExternalColor.glsl-DInimqAq.js";import{t as l,n as V,i as O}from"./oitResolution.glsl-BA_xBdPi.js";import{s as ga}from"./RibbonLine.glsl-gnOVG4TW.js";import{c as Oa}from"./NoParameters-DB-WZ6gy.js";import{s as Ye}from"./ShaderBuilder-H3U2wzCg.js";import{O as Xe,g as Qe,u as Ca}from"./renderState-C9OPedUa.js";import{Q as Ke,t as Ae}from"./InterleavedLayout-DNmNP7rp.js";const Sa=()=>ut.getLogger("esri.views.3d.layers.graphics.featureExpressionInfoUtils");function ba(a){return{cachedResult:a.cachedResult,arcade:a.arcade?{func:a.arcade.func,context:a.arcade.modules.arcadeUtils.createExecContext(null,{sr:a.arcade.context.spatialReference}),modules:a.arcade.modules}:null}}async function rr(a,e,r,t){const s=a?.expression;if(typeof s!="string")return null;const i=$a(s);if(i!=null)return{cachedResult:i};const u=await ft();dt(r);const o=u.arcadeUtils,p=o.createSyntaxTree(s);if(!p)return null;if(o.dependsOnView(p))return t?.error("Expressions containing '$view' are not supported on ElevationInfo"),{cachedResult:0};const d=o.createFunction(p);return d?{arcade:{modules:u,func:d,context:o.createExecContext(null,{sr:e})}}:null}function wa(a,e,r){return a.arcadeUtils.createFeature(e.attributes,e.geometry,r)}function ya(a,e){if(a!=null&&!Ze(a)){if(!e||!a.arcade)return void Sa().errorOncePerTick("Arcade support required but not provided");const r=e;r._geometry&&(r._geometry=Rt(r._geometry)),a.arcade.modules.arcadeUtils.updateExecContext(a.arcade.context,e)}}function za(a){if(a!=null){if(Ze(a))return a.cachedResult;const e=a.arcade;let r=e?.modules.arcadeUtils.executeFunction(e.func,e.context);return typeof r!="number"&&(a.cachedResult=0,r=0),r}return 0}function sr(a,e=!1){let r=a?.featureExpressionInfo;const t=r?.expression;return e||t==="0"||(r=null),r??null}const or={cachedResult:0};function Ze(a){return a.cachedResult!=null}function $a(a){return a==="0"?0:null}class Je{constructor(){this._meterUnitOffset=0,this._renderUnitOffset=0,this._unit="meters",this._metersPerElevationInfoUnit=1,this._featureExpressionInfoContext=null,this.mode=null,this.centerInElevationSR=null}get featureExpressionInfoContext(){return this._featureExpressionInfoContext}get meterUnitOffset(){return this._meterUnitOffset}get unit(){return this._unit}set unit(e){this._unit=e,this._metersPerElevationInfoUnit=pt(e)}get requiresSampledElevationInfo(){return this.mode!=="absolute-height"}reset(){this.mode=null,this._meterUnitOffset=0,this._renderUnitOffset=0,this._featureExpressionInfoContext=null,this.unit="meters"}set offsetMeters(e){this._meterUnitOffset=e,this._renderUnitOffset=0}set offsetElevationInfoUnits(e){this._meterUnitOffset=e*this._metersPerElevationInfoUnit,this._renderUnitOffset=0}addOffsetRenderUnits(e){this._renderUnitOffset+=e}geometryZWithOffset(e,r){const t=this.calculateOffsetRenderUnits(r);return this.featureExpressionInfoContext!=null?t:e+t}calculateOffsetRenderUnits(e){let r=this._meterUnitOffset;const t=this.featureExpressionInfoContext;return t!=null&&(r+=za(t)*this._metersPerElevationInfoUnit),r/e.unitInMeters+this._renderUnitOffset}setFromElevationInfo(e){this.mode=e.mode,this.unit=ht(e.unit)?e.unit:"meters",this.offsetElevationInfoUnits=e.offset??0}setFeatureExpressionInfoContext(e){this._featureExpressionInfoContext=e}updateFeatureExpressionInfoContextForGraphic(e,r,t){e.arcade?(this._featureExpressionInfoContext=ba(e),this.updateFeatureExpressionFeature(r,t)):this._featureExpressionInfoContext=e}updateFeatureExpressionFeature(e,r){const t=this.featureExpressionInfoContext;t?.arcade&&(t.cachedResult=void 0,ya(this._featureExpressionInfoContext,e.geometry?wa(t.arcade.modules,e,r):null))}static fromElevationInfo(e){const r=new Je;return e!=null&&r.setFromElevationInfo(e),r}}const et=.5;function Pa(a,e){const r=a.vertex;a.include(Ge),a.attributes.add("position","vec3"),a.vertex.inputs.add("position",()=>"position"),a.attributes.add("normal","vec3"),e.hasVertexCenterOffset?a.attributes.add("centerOffset","vec3"):r.constants.add("centerOffset","vec3",[0,0,0]),a.attributes.add("groundDistance","float"),It(r,e),jt(r,e),r.uniforms.add(new ke("viewport",t=>t.camera.fullViewport),new q("polygonOffset",t=>t.shaderPolygonOffset),new ye("aboveGround",t=>t.camera.aboveGround?1:-1)),e.hasVerticalOffset&&fa(r),r.code.add(l`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),r.code.add(l`float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
float pointGroundSign = sign(pointGroundDistance);
if (pointGroundSign == 0.0) {
pointGroundSign = aboveGround;
}
float groundRelative = aboveGround * pointGroundSign;
if (polygonOffset > .0) {
float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
float factor = (1.0 - tanAlpha / viewport[2]);
if (groundRelative > 0.0) {
posView *= factor;
}
else {
posView /= factor;
}
}
return groundRelative;
}`),e.draped&&!e.hasVerticalOffset||Mt(r),e.draped||(r.uniforms.add(new ye("perDistancePixelRatio",t=>Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2))),r.code.add(l`
      void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
        float distanceToCamera = length(posView);

        // Compute offset in world units for a half pixel shift
        float pixelOffset = distanceToCamera * perDistancePixelRatio * ${l.float(et)};

        // Apply offset along normal in the direction away from the ground surface
        vec3 modelOffset = normalModel * aboveGround * pixelOffset;

        // Apply the same offset also on the view space position
        vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

        posModel += modelOffset;
        posView += viewOffset;
      }
    `)),e.screenCenterOffsetUnitsEnabled&&He(r),e.hasScreenSizePerspective&&Ne(r),r.code.add(l`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      float pointGroundDistance = groundDistance;
      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${e.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${e.hasScreenSizePerspective&&(e.hasVerticalOffset||e.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${e.hasVerticalOffset?e.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${e.hasVerticalOffset?l`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${e.screenCenterOffsetUnitsEnabled?"":l`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${e.screenCenterOffsetUnitsEnabled?e.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${e.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function Aa(a){a.uniforms.add(new da("alignPixelEnabled",e=>e.alignPixelEnabled)),a.code.add(l`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),a.code.add(l`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}class tt extends Oa{constructor(){super(...arguments),this.effect=0,this.fadeFactor=vt(1)}}function Va(){const a=new Ye;return a.include(va),a.outputs.add("fragColor","vec4",0),a.fragment.uniforms.add(new K("colorTexture",e=>e.color),new K("focusArea",e=>e.focusArea),new We("focusAreaEffectMode",e=>e.effect),new q("fadeFactor",e=>e.fadeFactor.value)).main.add(l`
      float mask = texture( focusArea, uv, 0.0 ).r;
      vec4 color = texture( colorTexture, uv, 0.0 );
      vec4 colorDeSaturate = vec4(color.r * 0.25 + color.g * 0.5 + color.b * 0.25);
      if (focusAreaEffectMode == ${l.int(0)}) {
        fragColor = mask > 0.0 ? color : mix(color, 0.55 * colorDeSaturate + 0.45, fadeFactor);
      } else {
        fragColor = mask > 0.0 ? color : mix(color, 0.33 * color, fadeFactor);
      }
  `),a}const _a=Object.freeze(Object.defineProperty({__proto__:null,FocusAreaColorPassParameters:tt,build:Va},Symbol.toStringTag,{value:"Module"}));let fe=class extends Le{constructor(){super(...arguments),this.shader=new qe(_a,()=>Me(()=>import("./HUDMaterial.glsl-BhR2_4Is.js").then(a=>a.F),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]))),this.ignoreUnused=!0}initializePipeline(){return Xe({colorWrite:Qe})}};fe=h([ue("esri.views.3d.webgl-engine.effects.focusArea.FocusAreaColorTechnique")],fe);let H=class extends ma{constructor(a){super({...a,view:a.focusAreasView.view}),this.consumes={required:[W.FOCUSAREA_COLOR,W.FOCUSAREA]},this.produces=W.FOCUSAREA_COLOR,this._fadeDirection=0,this._passParameters=new tt}fadeOut(a){this.removeAllHandles(),this._startTime=null,this._fadeDirection=1,this.addHandles(mt(()=>this._passParameters.fadeFactor.value,e=>{e===0&&(this.removeAllHandles(),a())})),this.requestRender(2)}render(a){const e=a.find(({name:C})=>C===this.produces),r=this.techniques.getCompiled(fe);if(!r)return this.requestRender(1),e;const t=this.focusAreasView.style,s=this.bindParameters,i=s.camera,u=i.fullViewport[2],o=i.fullViewport[3];this._startTime??=this.view.stage?.renderer.renderContext.time;const p=this.view.qualitySettings.fadeDuration,d=p>0?Math.min(p,this.view.stage?.renderer.renderContext.time-this._startTime)/p:1,v=a.find(({name:C})=>C===W.FOCUSAREA),c=this.fboCache.acquire(u,o,this.produces),m=this.renderingContext;return m.bindFramebuffer(c.fbo),this._passParameters.color=e.getTexture(),this._passParameters.focusArea=v.getTexture(),this._passParameters.effect=at[t],this._passParameters.fadeFactor.value=this._fadeDirection===0?d:1-d,m.bindTechnique(r,s,this._passParameters),m.screen.draw(),c.attachDepth(e.getAttachment(xt)),d<1&&this.requestRender(2),c}};h([ee()],H.prototype,"consumes",void 0),h([ee()],H.prototype,"produces",void 0),h([ee({constructOnly:!0})],H.prototype,"focusAreasView",void 0),H=h([ue("esri.views.3d.webgl-engine.effects.focusArea.FocusAreaColorNode")],H);const at={bright:0,dark:1},Fa=a=>a?at[a]:0;function Da(a){const e=new Ye;e.include(Pa,a),e.vertex.include(Bt,a);const{output:r,hasOcclusionTexture:t,signedDistanceFieldEnabled:s,pixelSnappingEnabled:i,hasEmission:u,hasScreenSizePerspective:o,debugDrawLabelBorder:p,hasVVSize:d,hasVVColor:v,hasRotation:c,occludedFragmentFade:m,sampleSignedDistanceFieldTexelCenter:C,hasVertexColor:D,hasVertexSize:F,hasVertexRotation:P,hasVertexUVi:S}=a;e.include(Ge),e.include(Ht,a),e.include(Lt,a),e.include(qt,a);const{vertex:g,fragment:f}=e;f.include(Gt),f.code.add(l`
    vec4 applyFocusAreaStyle(vec4 color, int style) {
      const float factor = 0.46;
      const float factorBright = 0.32;

      if (style == ${l.int(0)}) {
        float luma = (color.r + color.g + color.b) / 3.0;
        float bright = luma * (1.0 - 0.6 * factorBright) + 0.6 * factorBright * color.a;
        float brightScaled = bright * factorBright;
        return vec4(brightScaled, brightScaled, brightScaled, color.a * factorBright);
      }

      float darkScaled = factor * factor;
      return vec4(color.rgb * darkScaled, color.a * factor);
    }
  `),e.varyings.add("vcolor","vec4"),e.varyings.add("vtc","vec2"),e.varyings.add("vsize","vec2");const y=r===10;g.uniforms.add(new ke("viewport",n=>n.camera.fullViewport),new oe("screenOffset",(n,I)=>he(X,2*n.screenOffset[0]*I.camera.pixelRatio,2*n.screenOffset[1]*I.camera.pixelRatio)),new oe("anchorPosition",n=>Z(n)),new ae("materialColor",({color:n})=>n),new q("materialRotation",n=>n.rotation),new oe("materialSize",n=>n.size),new K("tex",n=>n.texture)),He(g),s&&(g.uniforms.add(new ae("outlineColor",n=>n.outlineColor)),f.uniforms.add(new ae("outlineColor",n=>Ve(n)?n.outlineColor:Ot),new q("outlineSize",n=>Ve(n)?n.outlineSize:0))),i&&g.include(Aa),o&&(xa(g),Ne(g)),p&&e.varyings.add("debugBorderCoords","vec4"),e.attributes.add("uv0","vec2"),S&&e.attributes.add("uvi","vec4"),D&&e.attributes.add("color","vec4"),F&&e.attributes.add("size","vec2"),P&&e.attributes.add("rotation","float"),(d||v)&&e.attributes.add("featureAttribute","vec4"),g.main.add(l`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      gl_Position = ${ga};
      return;
    }

    vec2 vertexSize = materialSize${V(F," * size")};
    vec2 inputSize;
    ${V(o,l`
        inputSize = screenSizePerspectiveScaleVec2(vertexSize, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,l`
        inputSize = vertexSize;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${V(d,l`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);
  `);const _=l`
  ${V(S,l`
    vec2 texSize = vec2(textureSize(tex, 0));
    vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0)) / texSize;
    `,l`
    vec2 uv = mix(vec2(0.), vec2(1.), bvec2(uv0));
    `)}

    quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

    ${V(c,l`
        float angle = radians(materialRotation${V(P," + rotation")});
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

        quadOffset.xy = rotate * quadOffset.xy;
      `)}

    quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,E=i?s?l`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:l`posProj += quadOffset;
if (inputSize.x == vertexSize.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:l`posProj += quadOffset;`;g.include(kt),g.main.add(l`
    ${_}
    ${v?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":D?"vcolor = color * materialColor;":"vcolor = materialColor;"}

    ${V(r===11,l`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < alphaCutoff;
    ${V(s,"alphaDiscard = alphaDiscard && outlineColor.a < alphaCutoff;")}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${E}
      gl_Position = posProj;
    }

    vtc = uv;

    ${V(p,l`debugBorderCoords = vec4(uv0, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `);const A=ce(r)&&a.hasFocusAreaStyle&&!a.draped;switch(f.uniforms.add(new K("tex",n=>n.texture)),A&&f.uniforms.add(new We("focusAreaStyle",n=>Fa(n.focusAreaStyle))),m&&!y&&(f.include(ua),f.uniforms.add(new ze("depthMap",n=>n.mainDepth),new q("occludedOpacity",n=>n.occludedFragmentOpacity?.value??1))),t&&f.uniforms.add(new ze("texOcclusion",n=>n.hudOcclusion?.attachment)),p?f.main.add(`
        float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));
        // don't discard fragments on debug border
        float textureAlphaCutoff = isBorder > 0.0 ? 0.0 : alphaCutoff;
      `):f.main.add("float textureAlphaCutoff = alphaCutoff;"),f.main.add("vec2 samplePos = vtc;"),C&&f.main.add(l`float txSize = float(textureSize(tex, 0).x);
float texelSize = 1.0 / txSize;
vec2 scaleFactor = (vsize - txSize) * texelSize;
samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`),s?f.main.add(l`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < textureAlphaCutoff ||
          fillPixelColor.a + outlinePixelColor.a < alphaCutoff
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
                              vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${V(!y,l`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < textureAlphaCutoff) {
          discard;
        }

        ${V(!y,l`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `):f.main.add(l`
        vec4 texColor = texture(tex, samplePos, -0.5);
        if (texColor.a < textureAlphaCutoff) {
          discard;
        }
        ${V(!y,l`fragColor = texColor * premultiplyAlpha(vcolor);`)}
      `),m&&!y&&f.main.add(l`
        float zSample = -linearizeDepth(texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x);
        float zFragment = -linearizeDepth(gl_FragCoord.z);
        if (zSample < ${l.float(1-Ra)} * zFragment) {
          fragColor *= occludedOpacity;
        }
      `),t&&f.main.add("fragColor *= texelFetch(texOcclusion, ivec2(gl_FragCoord.xy), 0).r;"),!y&&p&&f.main.add("fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);"),r===2&&f.main.add(l`if (fragColor.a < alphaCutoff) {
discard;
}`),A&&f.main.add(l`fragColor = applyFocusAreaStyle(fragColor, focusAreaStyle);`),ce(r)&&u&&f.main.add("fragEmission = vec4(0.0);"),r){case 1:f.main.add(`
        fragColor = vec4(fragColor.rgb * floatBlendOutputScale, fragColor.a);
        fragAlpha = fragColor.a * floatBlendOutputScale;
      `);break;case 2:f.main.add("fragColor.rgb /= fragColor.a;");break;case 11:f.main.add("outputObjectAndLayerIdColor();");break;case 10:e.include(Nt,a),f.main.add("outputHighlight(false);")}return e}function Ve(a){return a.outlineColor[3]>0&&a.outlineSize>0}function Z(a){return a.textureIsSignedDistanceField?Ea(a.anchorPosition,a.distanceFieldBoundingBox,X):gt(X,a.anchorPosition),X}const X=pe();function Ea(a,e,r){he(r,a[0]*(e[2]-e[0])+e[0],a[1]*(e[3]-e[1])+e[1])}const Ra=.08,Ua=Object.freeze(Object.defineProperty({__proto__:null,anchorPosition:Z,build:Da},Symbol.toStringTag,{value:"Module"}));let de=class extends Le{constructor(a,e){super(a,e,Ae(rt).concat(Ae(st(e)))),this.shader=new qe(Ua,()=>Me(()=>import("./HUDMaterial.glsl-BhR2_4Is.js").then(r=>r.H),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]))),this.ignoreUnused=!0,this.primitiveType=Ct.TRIANGLE_STRIP}initializePipeline(a){const{draped:e,output:r,depthTestEnabled:t}=a,s=Qt(r),i=t&&!e&&!s&&r!==10;return Xe({blending:Xt(r,!0),depthTest:t&&!e?{func:515}:null,depthWrite:i?Ca:null,colorWrite:Qe,polygonOffset:Yt(a)})}};de=h([ue("esri.views.3d.webgl-engine.shaders.HUDMaterialTechnique")],de);const rt=Ke().vec2u8("uv0",{glNormalized:!0});function st(a){let e=Ke().vec3f("position").vec3f("normal").f32("groundDistance");return a.hasVertexCenterOffset&&(e=e.vec3f("centerOffset")),a.hasVertexColor&&(e=e.vec4u8("color",{glNormalized:!0})),a.hasVertexSize&&(e=e.vec2f("size")),a.hasVertexRotation&&(e=e.f32("rotation")),(a.hasVVColor||a.hasVVSize)&&(e=e.vec4f("featureAttribute")),a.hasVertexUVi&&(e=e.vec4i16("uvi")),Wt()?e.vec4u8("olidColor"):e}class x extends Kt{constructor(e,r){super(),this.spherical=e,this.polygonOffset=0,this.enableOITOffset=!1,this.screenCenterOffsetUnitsEnabled=!1,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.occludedFragmentFade=!1,this.hasOcclusionTexture=!1,this.hasFocusAreaStyle=!1,this.hasVertexColor=!0,this.hasVertexSize=!0,this.hasVertexRotation=!0,this.hasVertexUVi=!0,this.hasVertexCenterOffset=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.hasVVInstancing=!1,this.snowCover=!1,this.transparentOccluded=r}}h([O()],x.prototype,"transparentOccluded",void 0),h([O({count:5})],x.prototype,"polygonOffset",void 0),h([O()],x.prototype,"enableOITOffset",void 0),h([O()],x.prototype,"screenCenterOffsetUnitsEnabled",void 0),h([O()],x.prototype,"signedDistanceFieldEnabled",void 0),h([O()],x.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),h([O()],x.prototype,"hasVVSize",void 0),h([O()],x.prototype,"hasVVColor",void 0),h([O()],x.prototype,"hasVerticalOffset",void 0),h([O()],x.prototype,"hasScreenSizePerspective",void 0),h([O()],x.prototype,"hasRotation",void 0),h([O()],x.prototype,"debugDrawLabelBorder",void 0),h([O()],x.prototype,"depthTestEnabled",void 0),h([O()],x.prototype,"pixelSnappingEnabled",void 0),h([O()],x.prototype,"draped",void 0),h([O()],x.prototype,"occludedFragmentFade",void 0),h([O()],x.prototype,"hasOcclusionTexture",void 0),h([O()],x.prototype,"hasFocusAreaStyle",void 0),h([O()],x.prototype,"hasVertexColor",void 0),h([O()],x.prototype,"hasVertexSize",void 0),h([O()],x.prototype,"hasVertexRotation",void 0),h([O()],x.prototype,"hasVertexUVi",void 0),h([O()],x.prototype,"hasVertexCenterOffset",void 0);class ir extends Zt{constructor(e,r,t=!1){super(e,La),this.produces=new Map([[12,s=>N(s)&&!this.parameters.drawAsLabel&&!this._configuration.transparentOccluded],[13,s=>N(s)&&!this.parameters.drawAsLabel&&this._configuration.transparentOccluded],[14,s=>N(s)&&this.parameters.drawAsLabel],[18,s=>this.parameters.draped&&N(s)]]),this._visible=!0,this._configuration=new x(r,t)}updateConfiguration(e){super.updateConfiguration(e);const{parameters:r,_configuration:t}=this,s=r.draped;t.enableOITOffset=e.enableOITOffset,t.hasSlicePlane=this.parameters.hasSlicePlane,t.hasVerticalOffset=!!this.parameters.verticalOffset,t.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,t.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",t.polygonOffset=this.parameters.polygonOffset,t.draped=s,t.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,t.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,t.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,t.hasRotation=this.parameters.hasRotation,t.hasVVSize=!!this.parameters.vvSize,t.hasVVColor=!!this.parameters.vvColor,t.occludedFragmentFade=!s&&!!this.parameters.occludedFragmentOpacity,t.hasFocusAreaStyle=this.parameters.focusAreaStyle!=null,t.depthTestEnabled=this.parameters.depthEnabled,t.hasVertexColor=this.parameters.hasVertexColor,t.hasVertexSize=this.parameters.hasVertexSize,t.hasVertexRotation=this.parameters.hasVertexRotation,t.hasVertexUVi=this.parameters.hasVertexUVi,t.hasVertexCenterOffset=this.parameters.hasVertexCenterOffset,ce(e.output)&&(t.debugDrawLabelBorder=!!Jt.LABELS_SHOW_BORDER),t.hasOcclusionTexture=!r.drawAsLabel&&t.transparentOccluded&&ea(e.output)}intersect(e,r,t,s,i,u){const{options:{selectionMode:o,hud:p,excludeLabels:d},point:v,camera:c}=t,{parameters:m}=this;if(!o||!p||d&&m.isLabel||!e.visible||!v||!c)return;const C=e.attributes.get("featureAttribute"),D=C==null?null:Oe(C.data,Ue),{scaleX:F,scaleY:P}=Ie(D,m,c.pixelRatio),S=e.attributes.get("position"),g=e.attributes.get("size"),f=e.attributes.get("normal"),y=e.attributes.get("rotation"),_=e.attributes.get("centerOffset"),E=this.parameters.size;Ut(S.size>=3);const A=this.parameters.centerOffsetUnits==="screen";for(let n=0;n<S.data.length/S.size;n++){const I=n*S.size;if(G(b,S.data[I],S.data[I+1],S.data[I+2]),Y(b,b,r),Y(b,b,c.viewMatrix),_){const U=n*_.size;G($,_.data[U],_.data[U+1],_.data[U+2])}else G($,0,0,0);if(!A&&(b[0]+=$[0],b[1]+=$[1],$[2]!==0)){const U=$[2];Ce($,b),St(b,b,k($,$,U))}const J=n*f.size;G(T,f.data[J],f.data[J+1],f.data[J+2]),Se(T,T,be(Re,r));const{normal:ot,cosAngle:it}=_e(T,c,Te),nt=je(this.parameters,b,it,c,ie);if(te(b,b,ot,nt),c.applyProjection(b,z),z[0]>-1){if(A&&($[0]||$[1])&&(z[0]+=$[0]*c.pixelRatio,$[1]!==0&&(z[1]+=ie.alignmentEvaluator.apply($[1])*c.pixelRatio),c.unapplyProjection(z,b)),z[0]+=this.parameters.screenOffset[0]*c.pixelRatio,z[1]+=this.parameters.screenOffset[1]*c.pixelRatio,z[0]=Math.floor(z[0]),z[1]=Math.floor(z[1]),w[0]=E[0],w[1]=E[1],g!=null){const M=n*g.size;w[0]*=g.data[M],w[1]*=g.data[M+1]}ie.evaluator.applyVec2(w,w);const U=Ma*c.pixelRatio;let me=0;m.textureIsSignedDistanceField&&(me=Math.min(m.outlineSize,.5*w[0])*c.pixelRatio/2),w[0]*=F,w[1]*=P;const lt=m.rotation+(y!=null?y.data[n*y.size]:0),ct=Z(m);if(Fe(v,z[0],z[1],w,U,me,lt,m,ct)){const M=t.ray;if(Y(De,b,bt(ja,c.viewMatrix)),z[0]=v[0],z[1]=v[1],c.unprojectFromRenderScreen(z,b)){const B=R();j(B,M.direction);const xe=1/Q(B);k(B,B,xe);const ge=wt(M.origin,b)*xe;u(ge,ge,B,-1,De)}}}}}intersectDraped(e,r,t,s,i){const u=e.attributes.get("position"),o=e.attributes.get("size"),p=e.attributes.get("rotation"),d=this.parameters,v=d.size,c=e.attributes.get("featureAttribute"),m=c==null?null:Oe(c.data,Ue),{scaleX:C,scaleY:D}=Ie(m,d,e.screenToWorldRatio),F=Ba*e.screenToWorldRatio;for(let P=0;P<u.data.length/u.size;P++){const S=P*u.size,g=u.data[S],f=u.data[S+1];if(w[0]=v[0],w[1]=v[1],o!=null){const A=P*o.size;w[0]*=o.data[A],w[1]*=o.data[A+1]}let y=0;d.textureIsSignedDistanceField&&(y=Math.min(d.outlineSize,.5*w[0])*e.screenToWorldRatio/2),w[0]*=C,w[1]*=D;const _=d.rotation+(p!=null?p.data[P*p.size]:0),E=Z(d);Fe(t,g,f,w,F,y,_,d,E)&&s(i.distance,i.renderDistance,i.normal,-1)}}createBufferWriter(){return new qa(this.parameters)}applyShaderOffsets(e,r,t,s,i,u,o,p){Se(ne,t,be(Re,s));const d=_e(ne,o,Te),v=Ga(Q(r),o),c=je(this.parameters,r,d.cosAngle,o,p);te(r,r,d.normal,c+v),te(e,e,ne,c+v);const m=u+c;this._applyPolygonOffsetView(r,d,m,o,r),this._applyCenterOffsetView(r,i,r)}applyShaderOffsetsNDC(e,r,t,s,i,u){return this._applyCenterOffsetNDC(e,r,s,i),u!=null&&j(u,i),this._applyPolygonOffsetNDC(i,t,s,i),i}_applyPolygonOffsetView(e,r,t,s,i){const u=s.aboveGround?1:-1;let o=Math.sign(t);o===0&&(o=u);const p=u*o;if(this.parameters.shaderPolygonOffset<=0)return j(i,e);const d=yt(Math.abs(r.cosAngle),.01,1),v=1-Math.sqrt(1-d*d)/d/s.viewport[2];return k(i,e,p>0?v:1/v),i}_applyCenterOffsetView(e,r,t){const s=this.parameters.centerOffsetUnits!=="screen";return t!==e&&j(t,e),s&&(t[0]+=r[0],t[1]+=r[1],r[2]&&(Ce(T,t),zt(t,t,k(T,T,r[2])))),t}_applyCenterOffsetNDC(e,r,t,s){const i=this.parameters.centerOffsetUnits!=="screen";return s!==e&&j(s,e),i||(s[0]+=r[0]/t.fullWidth*2,s[1]+=r[1]/t.fullHeight*2),s}_applyPolygonOffsetNDC(e,r,t,s){const i=this.parameters.shaderPolygonOffset;if(e!==s&&j(s,e),i){const u=t.aboveGround?1:-1,o=u*Math.sign(r);s[2]-=(o||u)*i}return s}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:r,outlineColor:t}=this.parameters,s=e[3]>=re||r>=re&&t[3]>=re;return this._visible&&s}createGLMaterial(e){return new Ta(e)}calculateRelativeScreenBounds(e,r,t=$t()){return Ia(this.parameters,e,r,t),t[2]=t[0]+e[0],t[3]=t[1]+e[1],t}}class Ta extends ha{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(de,e)}}function Ia(a,e,r,t){t[0]=a.anchorPosition[0]*-e[0]+a.screenOffset[0]*r,t[1]=a.anchorPosition[1]*-e[1]+a.screenOffset[1]*r}function _e(a,e,r){return Y(r.normal,a,e.viewInverseTransposeMatrix),r.cosAngle=Vt(r.normal,Ha),r}function Fe(a,e,r,t,s,i,u,o,p){let d=e-s-t[0]*p[0],v=d+t[0]+2*s,c=r-s-t[1]*p[1],m=c+t[1]+2*s;const C=o.distanceFieldBoundingBox;return o.textureIsSignedDistanceField&&C!=null&&(d+=t[0]*C[0],c+=t[1]*C[1],v-=t[0]*(1-C[2]),m-=t[1]*(1-C[3]),d-=i,v+=i,c-=i,m+=i),he(Ee,e,r),_t(L,a,Ee,Ft(u)),L[0]>d&&L[0]<v&&L[1]>c&&L[1]<m}const ie=new ta,b=R(),T=R(),z=ve(),ne=R(),De=R(),L=pe(),Ee=pe(),Re=At(),ja=Dt(),$=R(),le=R(),Ue=ve(),Te={normal:R(),cosAngle:0},Ma=1,Ba=2,w=Be(0,0),Ha=Et(0,0,1);class La extends pa{constructor(){super(...arguments),this.renderOccluded=1,this.testsTransparentRenderOrder=0,this.isDecoration=!1,this.color=we,this.size=Pt,this.polygonOffset=0,this.anchorPosition=Be(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=we,this.outlineSize=0,this.distanceFieldBoundingBox=ve(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.hasVertexColor=!1,this.hasVertexSize=!1,this.hasVertexRotation=!1,this.hasVertexUVi=!1,this.hasVertexCenterOffset=!1,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.focusAreaStyle=null,this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class qa{constructor(e){this.baseInstanceLayout=rt,this.layout=st(e)}elementCount(e){return e.get("position").indices.length}elementCountBaseInstance(e){return e.get("uv0").indices.length}write(e,r,t,s,i){if(i==null)return;const{buffer:u,offset:o}=i,{position:p,normal:d,color:v,size:c,rotation:m,centerOffset:C,groundDistance:D,featureAttribute:F,uvi:P}=u;sa(t.get("position"),e,p,o),oa(t.get("normal"),r,d,o);const S=t.get("position").indices.length;if(P){const g=t.get("uvi")?.data;if(g&&g.length>=4){const[f,y,_,E]=g;for(let A=0;A<S;++A){const n=o+A;P.setValues(n,f,y,_,E)}}}if(v&&ia(t.get("color"),4,v,o),c&&$e(t.get("size"),c,o),m&&Pe(t.get("rotation"),m,o),C&&(t.get("centerOffset")?na(t.get("centerOffset"),C,o):se(C,o,S)),t.get("groundDistance")?Pe(t.get("groundDistance"),D,o):se(D,o,S),F&&(t.get("featureAttribute")?la(t.get("featureAttribute"),F,o):se(F,o,S)),s!=null){const g=t.get("position")?.indices;if(g){const f=g.length,y=u.getField("olidColor",Tt);ca(s,y,f,o)}}}writeBaseInstance(e,r){const{uv0:t}=r;$e(e.get("uv0"),t,0)}}function Ie(a,e,r){return a==null||e.vvSize==null?{scaleX:r,scaleY:r}:(aa(le,e,a),{scaleX:le[0]*r,scaleY:le[1]*r})}function Ga(a,e){const r=e.computeRenderPixelSizeAtDist(a)*et;return(e.aboveGround?1:-1)*r}function je(a,e,r,t,s){if(!a.verticalOffset?.screenLength){const p=Q(e);return s.update(r,p,a.screenSizePerspective,a.screenSizePerspectiveMinPixelReferenceSize,a.screenSizePerspectiveAlignment,null),0}const i=Q(e),u=a.screenSizePerspectiveAlignment??a.screenSizePerspective,o=ra(t,i,a.verticalOffset,r,u,a.screenSizePerspectiveMinPixelReferenceSize);return s.update(r,i,a.screenSizePerspective,a.screenSizePerspectiveMinPixelReferenceSize,a.screenSizePerspectiveAlignment,null),o}export{Da as $,Z as V,Pa as a,tt as b,sr as d,or as f,Va as i,Aa as l,Je as o,ir as r,rr as s};
