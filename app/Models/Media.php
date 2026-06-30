<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    protected $fillable = [
        'type', 'title_fr', 'title_ar', 'description_fr', 'description_ar',
        'file_path', 'video_url', 'thumbnail', 'categorie', 'is_published', 'sort_order',
    ];

    protected $appends = [
        'file_url',
        'thumbnail_url',
        'video_id',
    ];

    protected function casts(): array
    {
        return ['is_published' => 'boolean'];
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderByDesc('id');
    }

    public function getFileUrlAttribute()
    {
        if (!$this->file_path) return null;
        if (str_starts_with($this->file_path, 'http')) return $this->file_path;
        return Storage::url($this->file_path);
    }

    public function getThumbnailUrlAttribute()
    {
        if (!$this->thumbnail) return null;
        if (str_starts_with($this->thumbnail, 'http')) return $this->thumbnail;
        return Storage::url($this->thumbnail);
    }

    public function getVideoIdAttribute()
    {
        if (!$this->video_url) return null;
        preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/', $this->video_url, $matches);
        return $matches[1] ?? null;
    }
}
