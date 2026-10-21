Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("c:\AI HACATHON CLOUD CAMP PROJECT\green_factory_brain_ai_full_project (1).zip")
foreach ($entry in $zip.Entries) {
    if ($entry.FullName -eq "index.html") {
        $stream = $entry.Open()
        $reader = New-Object System.IO.StreamReader($stream)
        $text = $reader.ReadToEnd()
        $reader.Close()
        $stream.Close()
        [System.IO.File]::WriteAllText("c:\AI HACATHON CLOUD CAMP PROJECT\scripts\orig_index.html", $text)
        Write-Host "Extracted index.html, length: $($text.Length)"
        break
    }
}
$zip.Dispose()
