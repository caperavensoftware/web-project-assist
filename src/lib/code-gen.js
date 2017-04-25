const fs = require("fs");
const dir = require('mkdirp');

import classTemplate from './../../../templates/class/class.js.template!text';
import classTestTemplate from './../../../templates/class/class-test.js.template!text';
import componentTemplate from './../../../templates/control/control.js.template!text';
import componentHtmlTemplate from './../../../templates/control/control.html.template!text';
import componentTestTemplate from './../../../templates/control/control-tests.js.template!text';
import viewTemplate from './../../../templates/views/view.js.template!text';
import viewHtmlTemplate from './../../../templates/views/view.html.template!text';
import viewTestTemplate from './../../../templates/views/view-tests.js.template!text';

export function generateClass(name, path, systemPath) {
    const className = createClassName(name);
    const classFileName = createFileName(name);

    const codeResult = populateTemplate(classTemplate, {
        "__classname__": className
    });

    const codeTestResult = populateTemplate(classTestTemplate, {
        "__classname__": className,
        "__classpath__": path,
        "__classfilename__": classFileName
    });

    saveContentToFile(`${systemPath}/src/${path}`, `${classFileName}.js`, codeResult);
    saveContentToFile(`${systemPath}/test/${path}`, `${classFileName}-tests.js`, codeTestResult);
}

export function generateComponent(name, systemPath) {
    const className = createClassName(name);
    const tagName = createFileName(name);

    const componentResult = populateTemplate(componentTemplate, {
        "__control-tag__": tagName,
        "__classname__": className
    });

    const componentTestResult = populateTemplate(componentTestTemplate, {
        "__control-tag__": tagName,
        "__classname__": className
    });

    saveContentToFile(`${systemPath}/src/components/${tagName}`, `${tagName}.js`, componentResult);
    saveContentToFile(`${systemPath}/src/components/${tagName}`, `${tagName}.html`, componentHtmlTemplate);
    saveContentToFile(`${systemPath}/test/components/${tagName}`, `${tagName}-tests.js`, componentTestResult);
}

export function generateView(name, systemPath) {
    const className = createClassName(name);
    const tagName = createFileName(name);

    const viewResult = populateTemplate(viewTemplate, {
        "__classname__": className,
    });

    const viewTestResult = populateTemplate(viewTestTemplate, {
        "__view-tag__": tagName,
        "__classname__": className
    });

    saveContentToFile(`${systemPath}/src/views/${tagName}`, `${tagName}.js`, viewResult);
    saveContentToFile(`${systemPath}/src/views/${tagName}`, `${tagName}.html`, viewHtmlTemplate);
    saveContentToFile(`${systemPath}/test/views/${tagName}`, `${tagName}-tests.js`, viewTestResult);
}

function saveContentToFile(path, file, content) {
    const saveCodePath = `${path}/${file}`;
    dir.sync(`${path}`);

    fs.writeFile(saveCodePath, content,  error => {
        if (error) {
            throw error;
        }
    });
}

function createFileName(name) {
    let result = name.replace(/([A-Z]+)/g, "-$1").replace(/^,/, "");

    if (result[0] === "-") {
        result = result.substr(1);
    }

    return result.toLowerCase();
}

function createClassName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function populateTemplate(template, map) {
    let result = template;
    const keys = Object.keys(map);

    for (let key of keys) {
        const replacement = map[key];
        result = result.split(key).join(replacement);
    }

    return result;
}