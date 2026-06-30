<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    protected $fillable = ['page', 'key', 'label_fr', 'label_ar', 'value_fr', 'value_ar', 'type', 'sort_order'];

    public function scopePage($query, $page)
    {
        return $query->where('page', $page)->orderBy('sort_order');
    }
}
