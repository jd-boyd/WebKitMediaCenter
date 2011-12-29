import sys
import time
import json

from PySide.QtCore import *
from PySide.QtGui import *
from PySide.QtWebKit import *

class PageInteraction:
    def __init__(self, web):
        self.web = web
        self.frame = self.web.page().mainFrame()

    def exec_js(self, code):
        self.frame.evaluateJavaScript(code)
