export const atmosphereVertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const atmosphereFragmentShader = `
varying vec3 vNormal;
void main() {
  float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
  gl_FragColor = vec4(0.39, 1.0, 0.85, 1.0) * intensity; // Cyan Glow #64ffda approx
}
`;

export const gridVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const gridFragmentShader = `
uniform float time;
uniform vec3 color;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  // Pulse effect based on time and UV
  float pulse = sin(time * 2.0 + vUv.y * 10.0) * 0.5 + 0.5;
  
  // Base alpha
  float alpha = 0.3 + pulse * 0.4;
  
  // Fresnel for edge glow
  float viewDot = dot(vNormal, vec3(0, 0, 1.0));
  float fresnel = pow(1.0 - abs(viewDot), 2.0);
  
  alpha += fresnel * 0.5;
  
  gl_FragColor = vec4(color, alpha);
}
`;
