import os
from django.core.exceptions import ValidationError
from mutagen.mp3 import MP3

def audioValidator(file):
    try:
        MP3(file)
    except:
        raise ValidationError("Unsupported file type")
    fileExtentions=['.mp3']
    extention=os.path.splitext(file.name)[1]
    if extention.lower() not in fileExtentions:
        raise ValidationError("Unacceptable file extension")