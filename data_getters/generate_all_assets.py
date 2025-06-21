import subprocess
import sys
import os

def run_album_theme():
    print('Generating album themed images...')
    subprocess.run([sys.executable, 'data_getters/album_theme_wrapper.py'], check=True)

def run_book_bg():
    print('Generating book backgrounds...')
    subprocess.run([sys.executable, 'data_getters/book_bg_generator.py'], check=True)

def main():
    run_album_theme()
    run_book_bg()
    print('All album and book backgrounds updated!')

if __name__ == '__main__':
    main()
