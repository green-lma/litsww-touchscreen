#!/bin/bash

# Set input and output directories (change if needed)
input_dir="."
output_dir="./webp_output"

# Create output directory if it doesn't exist
mkdir -p "$output_dir"

# Loop through all JPG and JPEG images in the directory
for file in "$input_dir"/*.{jpg,jpeg}; do
    # Check if file exists to prevent errors in case of no matches
    [ -e "$file" ] || continue

    # Extract filename without extension
    filename=$(basename -- "$file")
    filename_no_ext="${filename%.*}"

    echo "Converting $file to WebP..."
    magick "$file" -strip -quality 80 -define webp:method=6 -define webp:lossless=false -define webp:thread-level=1 "$output_dir/$filename_no_ext.webp"
done

echo "Conversion complete! WebP images saved in $output_dir"
