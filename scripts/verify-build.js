#!/usr/bin/env node

/**
 * Script de verificación para el build de Mariana Rojas
 * Verifica que todas las dependencias necesarias estén presentes
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del proyecto...\n');

// Verificar package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json no encontrado');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Dependencias requeridas
const requiredDependencies = [
  '@next-auth/prisma-adapter',
  'bcryptjs',
  'react-day-picker',
  'next-auth',
  'prisma',
  'mercadopago',
  'resend',
  'zod'
];

const requiredDevDependencies = [
  '@types/bcryptjs',
  '@types/node',
  '@types/react',
  '@types/react-dom'
];

console.log('📦 Verificando dependencias...');

let allDepsPresent = true;

requiredDependencies.forEach(dep => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep}: FALTANTE`);
    allDepsPresent = false;
  }
});

requiredDevDependencies.forEach(dep => {
  if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
    console.log(`✅ ${dep}: ${packageJson.devDependencies[dep]}`);
  } else {
    console.log(`❌ ${dep}: FALTANTE`);
    allDepsPresent = false;
  }
});

// Verificar archivos de configuración
console.log('\n📁 Verificando archivos de configuración...');

const configFiles = [
  'next.config.js',
  'vercel.json',
  'prisma/schema.prisma',
  'tailwind.config.js',
  'tsconfig.json'
];

configFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file}: FALTANTE`);
    allDepsPresent = false;
  }
});

// Verificar scripts de package.json
console.log('\n🔧 Verificando scripts...');

const requiredScripts = ['dev', 'build', 'start', 'db:push', 'db:seed'];

requiredScripts.forEach(script => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
  } else {
    console.log(`❌ ${script}: FALTANTE`);
    allDepsPresent = false;
  }
});

// Verificar configuración de Prisma
if (packageJson.prisma && packageJson.prisma.seed) {
  console.log('✅ Prisma seed configurado');
} else {
  console.log('❌ Prisma seed: FALTANTE');
  allDepsPresent = false;
}

// Resultado final
console.log('\n' + '='.repeat(50));

if (allDepsPresent) {
  console.log('🎉 ¡Todo está configurado correctamente!');
  console.log('✅ El proyecto está listo para desplegar en Vercel');
  console.log('\n📋 Próximos pasos:');
  console.log('1. git add .');
  console.log('2. git commit -m "Fix build errors"');
  console.log('3. git push origin main');
  console.log('4. Configurar variables de entorno en Vercel');
  console.log('5. Configurar base de datos PostgreSQL');
} else {
  console.log('❌ Hay problemas en la configuración');
  console.log('🔧 Revisa los elementos marcados como FALTANTE');
  process.exit(1);
}

console.log('\n🚀 ¡Mariana Rojas estará online pronto! 💅✨');

