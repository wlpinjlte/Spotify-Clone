# Generated by Django 4.2.5 on 2023-09-18 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_song_audiofile_alter_song_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='timeLength',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
        ),
    ]