<div class="btn-group chili-btn-group" style="width: 200px;" id="pagesNav">
    <button data-action="firstPage" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="{{ trans('common.firstPage') }}">
        <i class="fas fa-angle-double-left"></i>
    </button>

    <button data-action="prePage" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="{{ trans('common.prePage') }}">
        <i class="fas fa-angle-left"></i>
    </button>

    <input data-action="toPage" type="text" id="page" name="page"
        class="form-control col-md-2 col-sm-2 col-2 p-1 fw-700 form-control-chili"
        style="text-align: center; color: white" placeholder="1" value="{{ $datalist->currentPage() }}">

    <button data-action="nextPage" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="{{ trans('common.nextPage') }}">
        <i class="fas fa-angle-right"></i>
    </button>

    <button data-action="lastPage" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="{{ trans('common.lastPage') }}">
        <i class="fas fa-angle-double-right"></i>
    </button>
</div>

<div class="d-inline-block ml-2" id="pagesDesc">
    {{ $datalist->lastPage() }} {{ trans('common.pages') }} / {{ $datalist->total() }} {{ trans('common.items') }}
</div>
