# docs

## parallax

## api

### Events:
Name | Desc
-----|-----
ready | means plugin has ready
enable | means plugin has be enable
disable | means plugin has be disable
destroy | means plugin has be destroy
enter | means plugin in your viewport

### Methods:
Name | Desc
-----|-----
value | plugin's value
enable | enable plugin, remove disable state
disable | disable plugin
destroy | destroy plugin
setAnimation | set animation type
setAnimationDelay | set animation delay
beforeLoad | it is a lifecycle hook, exec something at load before
afterLoad | exec something at load after
load | when plugin is loading, exec something
isLoad | make sure plugin is load or not
setDelay | set load delay


## version
Version: 0.0.1