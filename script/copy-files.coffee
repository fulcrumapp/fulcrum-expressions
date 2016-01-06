fs = require 'fs-sync'
_ = require 'underscore'
path = require 'path'

android = process.env.FULCRUM_ANDROID
ios     = process.env.FULCRUM_IOS
web     = process.env.FULCRUM_WEB
site    = process.env.FULCRUM_DEV_SITE

if not android and not ios and not web and not site
   console.error """
   You must set one of:
   FULCRUM_ANDROID
   FULCRUM_IOS
   FULCRUM_WEB
   FULCRUM_DEV_SITE
   """

   process.exit(1)

expressionjs = './dist/expressions.js'

copyFile = (src, dest) ->
  console.log "Copying #{src} to #{dest}"
  fs.copy(src, dest, force: true)

if android
  copyFile(expressionjs, path.join(android, 'src', 'main', 'res', 'raw', 'expressions.js'))

if ios
  copyFile(expressionjs, path.join(ios, 'Fulcrum', 'Resources', 'expressions.js'))

if web
  copyFile(expressionjs, path.join(web, 'public', 'resources', 'expressions.js'))
  copyFile('./docs/output/functions.coffee', path.join(web, 'app', 'assets', 'javascripts', 'form_builder', 'models', 'expression_functions.js.coffee'))
  copyFile('./docs/output/event_functions.coffee', path.join(web, 'app', 'assets', 'javascripts', 'form_builder', 'models', 'event_functions.js.coffee'))

if site
  fs.remove(path.join(site, '_expressions', 'reference'))
  fs.mkdir(path.join(site, '_expressions', 'reference'))
  copyFile('./docs/output/help/expressions', path.join(site, '_expressions'))

  fs.remove(path.join(site, '_events', 'reference'))
  fs.mkdir(path.join(site, '_events', 'reference'))
  copyFile('./docs/output/help/events', path.join(site, '_events'))
