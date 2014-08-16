This is a version of the MuseScore Color Notes plugin that has been
modified for young learners. It is intended with a piano that has
colored stickers placed on the keys, for small children who have not yet
learned to sight read.

We use higher-contrast colors from the a HSV colormap, which is eaiser
for younger children to read. Also, instead of using 12 distinct colors,
we repeat the same color for both a note and its corresponding sharp.
Finally, since we are repeating colors, we have hand-picked the colors
in the colormap to match the colors that Ravi's grandpa uses in the
music books he writes.

Below is the python code that generated the color array. The resulting
array was then hand-edited to repeat some colors (e.g. C and C# have the
same color). Every time a color was repeated, I removed a different one,
so that there would still be 12 entries in the array.

```python
colors = matplotlib.pyplot.cm.hsv(arange(256))
num = 0
for i in range(0, len(x), 20):
    a = colors[i]*255
    print 'new QColor({}, {}, {}),'.format(int(a[0]), int(a[1]), int(a[2]))
    num+=1
    if num==12:
        break
```

To install this plugin on OS X, copy the `colornotes-highcontrast.js` file into the
`~/Library/Application\ Support/MusE/MuseScore/plugins/` directory.
