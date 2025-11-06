#!/usr/bin/env python3
"""
Create placeholder images for missing assets in the Pacific Life website.
This script creates simple placeholder PNG images with appropriate text.
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(filename, width=800, height=600, text="Placeholder"):
    """Create a placeholder image with specified dimensions and text."""
    # Create a new image with a light gray background
    img = Image.new('RGB', (width, height), color='#f0f0f0')
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font, fallback to basic font if not available
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        try:
            font = ImageFont.load_default()
        except:
            font = None
    
    # Calculate text position to center it
    if font:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    else:
        text_width = len(text) * 10  # Rough estimate
        text_height = 20
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Draw the text
    draw.text((x, y), text, fill='#666666', font=font)
    
    # Draw a border
    draw.rectangle([(0, 0), (width-1, height-1)], outline='#cccccc', width=2)
    
    # Save the image
    img.save(filename)
    print(f"Created placeholder image: {filename}")

def main():
    """Create all missing placeholder images."""
    # List of missing images with their appropriate sizes and labels
    placeholders = [
        ("Picture1.png", 800, 600, "Architecture Diagram 1"),
        ("Picture2.png", 800, 600, "Architecture Diagram 2"),
        ("Annuity workflow.png", 1000, 700, "Annuity Workflow"),
        ("marketflow.png", 1000, 700, "Market Flow Process")
    ]
    
    for filename, width, height, text in placeholders:
        if not os.path.exists(filename):
            create_placeholder_image(filename, width, height, text)
        else:
            print(f"File already exists: {filename}")

if __name__ == "__main__":
    main()
