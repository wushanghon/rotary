<?php

namespace App\Http\Middleware;

use App\Service\Admin\Chiliman\BackEndTreeViewService;
use Closure;

class TreeView
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    protected $BackEndTreeViewService;

    public function __construct(BackEndTreeViewService $BackEndTreeViewService)
    {
        $this->BackEndTreeViewService = $BackEndTreeViewService;
    }

    public function handle($request, Closure $next)
    {
        $treeView = $this->BackEndTreeViewService->GetTreeCont(session('crmm_id'), session('user_no'));

        session()->put('treeView', $treeView);

        return $next($request);
    }
}
