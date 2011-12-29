#!/usr/bin/python
import os
import sys
import time
import json

from PySide.QtCore import *
from PySide.QtGui import *
from PySide.QtWebKit import *

from PySide import QtGui, QtDeclarative

from modules.page_interaction import PageInteraction

class LoadVideos(QObject):
    def __init__(self, page_interaction, parent = None):
        super(LoadVideos, self).__init__(parent)
        self.js = page_interaction

    @Slot(result=str)
    def root(self):
        files = os.listdir('test/videos/')
        data = []
        for filename in files:
            data.append('test/videos/' + filename)
        return json.dumps(data)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    web = QWebView()
    web.settings().setAttribute(QWebSettings.DeveloperExtrasEnabled, True)
    web.settings().setAttribute(QWebSettings.PluginsEnabled, True)
    web.settings().setOfflineStoragePath('/tmp')
    web.settings().setOfflineStorageDefaultQuota(100000000)
    web.load(QUrl("main.html"))

    page_interaction = PageInteraction(web)
    videos = LoadVideos(page_interaction)

    frame = web.page().mainFrame()
    frame.addToJavaScriptWindowObject('videos', videos)

    web.show()

    inspect = QWebInspector()
    inspect.setPage(web.page())

    sys.exit(app.exec_())














#class VideoPlayer(QObject):
#def __init__(self, page_interaction, parent = None):
    #super(VideoPlayer, self).__init__(parent)
    #self.js = page_interaction

#@Slot(str)
#def load_and_play(self, filename):
    #self.js.exec_js('''$("#video_player").empty();''')
    #self.js.exec_js('''var video = $("<video>");''')
    #self.js.exec_js('''video.attr("width", "320");''')
    #self.js.exec_js('''video.attr("height", "240");''')
    #self.js.exec_js('''video.attr("controls", "controls");''')
    #self.js.exec_js('''var source = $("<source>");''')
    #self.js.exec_js('''source.attr("src", "%s");''' % filename)
    #if filename.endswith('.mp4'):
        #self.js.exec_js('''source.attr("type", "video/mp4");''')
    #elif filename.endswith('.ogg'):
        #self.js.exec_js('''source.attr("type", "video/ogg");''')
    #self.js.exec_js('''video.append(source);''')
    #self.js.exec_js('''$("#video_player").append(video);''')
