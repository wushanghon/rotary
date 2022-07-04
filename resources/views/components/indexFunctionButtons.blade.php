<div class="btn-group chili-btn-group mantain-task float-left">
    @if (isset($ADD) && $ADD == 'false')
    @elseif (session('g_add') == 'Y' || (isset($ADD) && $ADD == 'true'))
        <button type="button" data-action="create" class="btn btn-info chili-btn chili-spaced full-rounded task-create">
            {{ trans('common.create') }}
        </button>
    @endif

    @if (isset($QUERY) && $QUERY == 'false')
    @elseif (session('g_query') == 'Y' || (isset($QUERY) && $QUERY == 'true'))
        <button type="button" class="btn btn-primary chili-btn chili-spaced full-rounded task-search"
            data-toggle="modal" data-target=".bd-example-modal-form">
            {{ trans('common.search') }}
        </button>
    @endif

    @if (isset($export) && $export=='true')
        <button type="button" data-action="export" class="btn btn-info chili-btn chili-spaced full-rounded task-create">
            {{ trans('common.export') }}
        </button>
    @endif

    @if (isset($import) && $import=='true')
        <button type="button" data-action="import" class="btn btn-info chili-btn chili-spaced full-rounded task-create">
            {{ trans('common.import') }}
        </button>
    @endif

    @if (isset($printShippingAddress) && $printShippingAddress == 'true')
        <button type="button" data-action="printShippingAddress" class="btn btn-info chili-btn chili-spaced full-rounded task-create">
            {{ trans('common.printShippingAddress') }}
        </button>
    @endif

    @if (isset($back) && $back == 'true')
        <button type="button" data-action="back" class="btn btn-info chili-btn chili-spaced full-rounded task-create">
            {{ trans('common.back') }}
        </button>
    @endif
</div>
