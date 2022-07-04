<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LogViewer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $gp_id = session()->get('gp_id');

        if ($gp_id != 'System')
            return redirect()->back();

        return $next($request);
    }
}
