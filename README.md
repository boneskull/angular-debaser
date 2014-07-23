#Index

**Classes**

* [class: .Config](#Config)
  * [new .Config(o, [aspect_name])](#new_Config)

**Functions**

* [debaser([name], [options])](#debaser)
* [configure([options])](#configure)
  * [configure~debaserSetup($provide)](#configure..debaserSetup)
* [getInstance(name)](#getInstance)
* [hasInstance(name)](#hasInstance)

**Typedefs**

* [type: DebaserOptions](#DebaserOptions)
 
<a name="Config"></a>
#class: .Config
**Members**

* [class: .Config](#Config)
  * [new .Config(o, [aspect_name])](#new_Config)

<a name="new_Config"></a>
##new .Config(o, [aspect_name])
**Params**

- `o``object` | `string` - Raw `Behavior` configuration object, or `Aspect` name
- \[`aspect_name`\]`string` - Name of `Aspect` this configuration belongs to

<a name="debaser"></a>
#debaser([name], [options])
Provides a `Debaser` object with which you can stub dependencies easily.

**Params**

- \[`name`=&#x60;DebaserOptions.name&#x60;\]`String` | `Object` - Optional name of Debaser.  Only useful if using
multiple instances.  If omitted, this is considered the `opts` parameter.
- \[`options`=&#x60;{}&#x60;\][DebaserOptions](#DebaserOptions) - Options to modify angular-debaser's behavior; see [DebaserOptions](#DebaserOptions).

**Returns**: `Debaser`  
**Example**  
```js
// Defaults
var d = debaser({
 debugEnabled: false,
 autoScope: true
 skipConfigs: true
});

// Named
var d = debaser('foo', {
 debugEnabled: false,
 autoScope: true
 skipConfigs: true
});
```

<a name="configure"></a>
#configure([options])
Provides an anonymous AngularJS module to set up some initial values before [module:decipher.debaser](module:decipher.debaser) is bootstrapped.

**Params**

- \[`options`\][DebaserOptions](#DebaserOptions) - Override [DebaserOptions](#DebaserOptions) with this object.

**Returns**: `function`  
<a name="getInstance"></a>
#getInstance(name)
Retrieve an existing Debaser instance by name.

**Params**

- `name``string` - Name of instance

**Returns**: `Debaser`  
<a name="hasInstance"></a>
#hasInstance(name)
Whether or not an instance with name exists.

**Params**

- `name``string` - Name of instance

**Returns**: `boolean`  
<a name="DebaserOptions"></a>
#type: DebaserOptions
Default options

**Type**: `object`  
