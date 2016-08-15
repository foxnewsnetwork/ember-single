var inflection = require('inflection');
var Promise    = require('ember-cli/lib/ext/promise');
var merge      = require('lodash').merge;
var Blueprint  = require('ember-cli/lib/models/blueprint');
var path       = require('path');
var fs         = require('fs-extra');

/*jshint node:true*/
// copied shamelessly from:
// https://github.com/kimroen/ember-cli-coffeescript/blob/master/blueprints/resource/index.jshint
module.exports = {
  description: 'Generates a model and a service for your singleton',

  install: function(options) {
    this.project = options.project;
    return this._process('install', options);
  },

  uninstall: function(options) {
    this.project = options.project;
    return this._process('uninstall', options);
  },

  _process: function(type, options) {
    var modelOptions = merge({}, options, {
      entity: {
        name: inflection.singularize(options.entity.name)
      }
    });
    var serviceOptions = merge({}, options);

    var self = this;
    return this._processBlueprint(type, 'model', modelOptions)
    .then(this._processBlueprint.bind(this, type, 'service', serviceOptions))
    .then(function() {
      if (type === 'install') {
        return self.afterInstall(options);
      } else {
        return self.afterUninstall(options);
      }
    });
  },

  _processBlueprint: function(type, name, options) {
    var mainBlueprint = Blueprint.lookup(name, {
      ui: this.ui,
      analytics: this.analytics,
      project: this.project,
      paths: this.project.blueprintLookupPaths()
    });

    var thisBlueprint = this;

    return Promise.resolve()
      .then(function() {
        return mainBlueprint[type](options);
      })
      .then(function() {
        var testBlueprint = mainBlueprint.lookupBlueprint(name + '-test', {
          ui: thisBlueprint.ui,
          analytics: thisBlueprint.analytics,
          project: thisBlueprint.project,
          paths: thisBlueprint.project.blueprintLookupPaths(),
          ignoreMissing: true
        });

        if (!testBlueprint) { return; }

        if (testBlueprint.locals === Blueprint.prototype.locals) {
          testBlueprint.locals = function(options) {
            return mainBlueprint.locals(options);
          };
        }

        return testBlueprint[type](options);
      }).then(function() {
        if (!thisBlueprint.project.isEmberCLIAddon() || thisBlueprint.dummy) {
          return;
        }
        var addonImport = mainBlueprint.lookupBlueprint('addon-import', {
          ui: thisBlueprint.ui,
          analytics: thisBlueprint.analytics,
          project: thisBlueprint.project,
          paths: thisBlueprint.project.blueprintLookupPaths()
        })

        if (!addonImport) { return; }

        if (addonImport.locals === Blueprint.prototype.locals) {
          addonImport.locals = function(options) {
            return mainBlueprint.locals(options);
          };
        }

        return addonImport[type](merge({}, options, { originBlueprintName: name }));
      });
  },

  afterInstall: function(options) {
    updateService.call(this, options);
    updateModel.call(this, options);
  }
};


function updateService(options) {
  var servicePath = path.join.apply(null, findFile('service', options));
  var source = fs.readFileSync(servicePath, 'utf-8');

  var newMixin = addMixinToService(source);

  fs.writeFileSync(servicePath, newMixin);
}

function updateModel(options) {
  var modelPath = path.join.apply(null, findFile('model', options));
  var source = fs.readFileSync(modelPath, 'utf-8');

  var newMixin = addMixinToModel(source);

  fs.writeFileSync(modelPath, newMixin); 
}

function findFile(type, options) {
  var filePathParts = [options.project.root];

  if (options.dummy && options.project.isEmberCLIAddon() && options.pod) {
    filePathParts = filePathParts.concat(['tests', 'dummy', 'app', options.entity.name, jsExt(type)]);
  } else if (options.dummy && options.project.isEmberCLIAddon() && !options.pod) {
    filePathParts = filePathParts.concat(['tests', 'dummy', 'app', pluralize(type), jsExt(options.entity.name)]);
  } else if (options.project.isEmberCLIAddon() && options.pod) {
    filePathParts = filePathParts.concat(['addon', options.entity.name, jsExt(type)]);
  } else if (options.project.isEmberCLIAddon() && !options.pod) {
    filePathParts = filePathParts.concat(['addon', pluralize(type), jsExt(options.entity.name)]);
  } else if (options.pod) { 
    filePathParts = filePathParts.concat(['app', options.entity.name, jsExt(type)]);
  } else {
    filePathParts = filePathParts.concat(['app', pluralize(type), jsExt(options.entity.name)]);
  }

  return filePathParts;
}

function pluralize(str) {
  return inflection.pluralize(str);
}

function jsExt(file) {
  return file + '.js';
}

function addMixinToService(oldContent) {
  return oldContent.replace(
    /^/,
    'import { SingleService } from \'ember-single\';\n'
  ).replace(
    'Ember.Service.extend(',
    'Ember.Service.extend(SingleService, '
  );
}

function addMixinToModel(oldContent) {
  return oldContent.replace(
    /^/,
    'import { SingleModel } from \'ember-single\';\n'
  ).replace(
    /\}\);\s*$/,
    '}).reopenClass(SingleModel);'
  ); 
}