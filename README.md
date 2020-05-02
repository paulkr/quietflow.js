quietflow.js
============

`quietflow.js` is a jQuery library for creating beautiful dynamic or static visual effects.

[Check it out!](http://paulkr.github.io/quietflow.js/)

Installation
------------

You can install quietflow through npm:

```bash
$ npm install quietflow
```
or through bower:

```bash
$ bower install quietflow
```

Alternatively, you can download the files in the `lib/` folder manually.


Usage
-----

Include a reference to the latest version of jQuery.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
```

Include a reference to `quietflow.js`.

```html
<script src="lib/quietflow.min.js"></script>
```

To apply quietflow to an element, use:

```javascript
$("#element").quietflow();
// or
$("body").quietflow();
```


Attributes
----------

`quietflow.js` is very customizable and has many features. Listen below are each attribute specific to its theme.


### Default

##### `theme`

The effect you would like to use. The default is set to `"starfield"`.

##### `z_index`

The z-index of the canvas object. The default is set to `-1000`.

#### Example

```javascript
$("body").quietflow({
	theme : "starfield",
	z_index : -1
})
```


Themes
------

### starfield

##### `starColor`

The color of the stars. Default is set to `white`.

##### `starSize`

The maximum random speed that can be assigned to each star. Default is set to `3`.

##### `speed`

Animation speed. Default is set to `100`.


### squareFlash

##### `squareSize`

The side length of each square. The default is set to `10`.

##### `maxRed`, `maxGreen`, `maxBlue`

These attributes specify the maximum value for red, green or blue respectively that can randomly be assigned to each square. The default sets each at `255` (100% random).

##### `speed`

The speed of the animation where new sqaures are generated (in milliseconds). Default is set to `100`.


### vortex

##### `mainRadius`

The large circle's radius. Default is set to `20`.

##### `miniRadii`

The radius of each circle contained within the large one. Default is set to `30`.

##### `backgroundCol`

The background color. Default is set to `"#3498DB"`.

##### `circleCol`

The color of the circle. Default is set to `"#34495E"`.

##### `speed`

Speed of the circle movement. Default is set to `10`.


### bouncingBalls

##### `specificColors`

This attribute is if you do not want the circle colors to be assigned randomly. It takes a list of colors as the argument. Default is set to empty (random colors to be used instead).

##### `backgroundCol`

The background color. Default is set to `"#ECF0F1"`.

##### `maxRadius`

The maximum random radius a circle can be assigned. Default is set to `40`.

##### `bounceSpeed`

Speed of the circle movement. Default is set to `50`.

##### `bounceBallCount`

Number of circles. Default is set to `50`.

##### `transparent`

Boolean to make circles have 50% opacity. Default is set to `true`.


### shootingLines

##### `backgroundCol`

The background color. Default is set to `black`.

##### `lineColor`

Color of the lines. Default is set to `white`.

##### `lineGlow`

The color of the glow around a line. Default is set to `white`.

##### `lines`

Number of lines. Default is set to `50`.

##### `speed`

The flashing speed. Default is set to `150`.


### simpleGradient

##### `primary`

The starting color. Default is set to `"#D4145A"`.

##### `accent`

The finishing color. Default is set to `"#FBB03B"`.


### layeredTriangles

##### `specificColors`

This attribute is if you do not want the circle colors to be assigned randomly. It takes a list of colors as the argument. Default is set to empty (random colors to be used instead).

##### `backgroundCol`

The background color. Default is set to `"#D6D6D6"`.

##### `triangles`

Number of triangles. Default is set to `50`.

##### `transparent`

Boolean to make triangles have 50% opacity. Default is set to `true`.


### cornerSpikes

##### `specificColors`

This attribute is if you do not want the circle colors to be assigned randomly. It takes a list of colors as the argument. Default is set to empty (random colors to be used instead).

##### `backgroundCol`

The background color. Default is set to `white`.

##### `lineColor`

Color of the lines. Default is set to `black`.

##### `lineGlow`

The color of the glow around a line. Default is set to `white`.

##### `speed`

The flashing speed. Default is set to `100`.


### floatingBoxes

##### `specificColors`

This attribute is if you do not want the circle colors to be assigned randomly. It takes a list of colors as the argument. Default is set to empty (random colors to be used instead).

##### `backgroundCol`

The background color. Default is set to `"#D6D6D6"`.

##### `boxCount`

Number of boxes. Default is set to `400`.

##### `maxBoxSize`

The maximum random side length that a box can be assigned. Default is set to `80`.

##### `transparent`

Boolean to make boxes have 50% opacity. Default is set to `true`.

##### `speed`

Speed to move boxes. Default set to `100`.


Note
----

All color attributes must be passed as strings in one of the following formats: html color name, hex code, rgb() or rgba().


Conclusion
----------

If you have any effect ideas you would like me to implement, let me know or even better, feel free to contribute to the project!
