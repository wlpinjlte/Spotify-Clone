from django.db import models
from .validators import audioValidator
from mutagen.mp3 import MP3
# Create your models here.
class Song(models.Model):
    title=models.CharField(max_length=200)
    author=models.CharField(max_length=200)
    image=models.ImageField(upload_to='api/files/images')
    audioFile=models.FileField(upload_to='api/files/audio_files',validators=[audioValidator])
    timeLength=models.DecimalField(max_digits=20,decimal_places=2,default=0)

    def __str__(self):
        return str(self.title)+"-"+str(self.author)

    def save(self,*args, **kwargs):
        self.timeLength=f'{MP3(self.audioFile).info.length:.2f}'
        return super().save(*args,**kwargs)

    class META:
        ordering="id"