//=============================================================================
//  MuseScore
//  Linux Music Score Editor
//  $Id:$
//
//  Color notehead plugin
//	Noteheads are colored according to pitch. User can change to color by
//  modifying the colors array. First element is C, second C# etc...
//
//  Copyright (C)2008 Werner Schweer and others
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License version 2.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
//=============================================================================

//
// This is ECMAScript code (ECMA-262 aka "Java Script")
//

/*
This is a version of the MuseScore Color Notes plugin that has been
modified for young learners. It is intended for use with a piano that has
colored stickers placed on the keys, for small children who have not yet
learned to sight read.

We use higher-contrast colors from the HSV colormap, which is eaiser
for younger children to read. Also, instead of using 12 distinct colors,
we repeat the same color for both a note and its corresponding sharp.
Finally, since we are repeating colors, we have hand-picked the colors
in the colormap to match the colors that Ravi's grandpa uses in the
music books he writes.

Below is the python code that generated the color array. The resulting
array was then hand-edited to repeat some colors (e.g. C and C# have the
same color). Every time a color was repeated, I removed a different one,
so that there would still be 12 entries in the array.

colors = matplotlib.pyplot.cm.hsv(arange(256))
num = 0
for i in range(0, len(x), 20):
    a = colors[i]*255
    print 'new QColor({}, {}, {}),'.format(int(a[0]), int(a[1]), int(a[2]))
    num+=1
    if num==12:
        break
*/


// HSV colormap
var colors = [
    new QColor(255, 0, 0),      //red       C
    new QColor(255, 0, 0),      //red       C#
    new QColor(255, 118, 0),    //orange    D
    new QColor(255, 118, 0),    //orange    D#
    new QColor(255, 236, 0),    //yellow    E
    /* new QColor(155, 255, 0),   light green  */
    /* new QColor(37, 255, 0),    bright green */
    new QColor(0, 255, 80),     //green     F
    new QColor(0, 255, 80),     //green     F#
    /* new QColor(0, 255, 198),   magenta      */
    /* new QColor(0, 193, 255),   light blue   */
    new QColor(0, 75, 255),     //blue      G
    new QColor(0, 75, 255),     //blue      G#
    /* new QColor(43, 0, 255),    indigo       */
    new QColor(161, 0, 255),    //purple    A
    new QColor(161, 0, 255),    //purple    A#
    new QColor(255, 0, 230)     //pink      B
    ];


//---------------------------------------------------------
//    init
//    this function will be called on startup of mscore
//---------------------------------------------------------

function init()
      {
      // print("test script init");
      }

//-------------------------------------------------------------------
//    run
//    this function will be called when activating the
//    plugin menu entry
//
//    global Variables:
//    pluginPath - contains the plugin path; file separator is "/"
//-------------------------------------------------------------------

function run()
      {
      if (typeof curScore === 'undefined')
            return;
      var cursor = new Cursor(curScore);
      for (var staff = 0; staff < curScore.staves; ++staff) {
            cursor.staff = staff;
            for (var v = 0; v < 4; v++) {
                  cursor.voice = v;
                  cursor.rewind();  // set cursor to first chord/rest

                  while (!cursor.eos()) {
                        if (cursor.isChord()) {
                              var chord = cursor.chord();
                              var n     = chord.notes;
                              for (var i = 0; i < n; i++) {
                                    var note   = chord.note(i);
                                    note.color = new QColor(colors[note.pitch % 12]);
                                    }
                              }
                        cursor.next();
                        }
                  }
            }
      }

//---------------------------------------------------------
//    menu:  defines were the function will be placed
//           in the MuseScore menu structure
//---------------------------------------------------------

var mscorePlugin = {
      menu: 'Plugins.Color Notes - High Contrast',
      init: init,
      run:  run
      };

mscorePlugin;

