# AccessibilityChecker  
Metodologías de desarrollo que contemplan aspectos de accesibilidad en dispositivos móviles  

### Configuración:

* Instalar [node](https://nodejs.org/download/)

* Instalar [bower](http://bower.io/):

```
npm install -g bower
```
Configurar dependencias de node: en el directorio fuente, escribir  

```
npm install
```
Configurar dependencias de bower: 
```
bower install
```

### Debug
En el webstorm, hay que ir a Run->Edit Configurations para crear una configuración de ejecución para checker.js

![](assets/img/run_config.png?raw=true)

### Test
```
node ./checker.js > test.java
```

