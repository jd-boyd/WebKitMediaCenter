#!/usr/bin/python
import os
import sys
import time
import json

from PySide.QtCore import *
from PySide.QtGui import *
from PySide.QtWebKit import *

from PySide import QtGui, QtDeclarative
from PySide.phonon import Phonon

from modules.page_interaction import PageInteraction

video_widget = None

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

class PlayVideo(QObject):
    def __init__(self, page_interaction, parent = None):
        super(PlayVideo, self).__init__(parent)
        self.js = page_interaction

    @Slot(str)
    def play(self, filepath):
        global video_widget
        media_source = Phonon.MediaSource(filepath)
        media_obj = Phonon.MediaObject()
        media_obj.setCurrentSource(media_source)
        video_widget = Phonon.VideoWidget()
        Phonon.createPath(media_obj, video_widget)
        audio_out = Phonon.AudioOutput(Phonon.VideoCategory)
        Phonon.createPath(media_obj, audio_out)
        video_widget.show()
        media_obj.play()

if __name__ == "__main__":
    global video_widget
    app = QApplication(sys.argv)
    web = QWebView()
    web.settings().setAttribute(QWebSettings.DeveloperExtrasEnabled, True)
    web.settings().setAttribute(QWebSettings.PluginsEnabled, True)
    web.settings().setOfflineStoragePath('/tmp')
    web.settings().setOfflineStorageDefaultQuota(100000000)
    web.load(QUrl("main.html"))
    video_widget = Phonon.VideoWidget()

    page_interaction = PageInteraction(web)
    videos = LoadVideos(page_interaction)
    player = PlayVideo(page_interaction)

    frame = web.page().mainFrame()
    frame.addToJavaScriptWindowObject('videos', videos)
    frame.addToJavaScriptWindowObject('external_player', player)

    web.show()

    inspect = QWebInspector()
    inspect.setPage(web.page())

    app.exec_()
