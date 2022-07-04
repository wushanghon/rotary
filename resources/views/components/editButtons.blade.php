<div class="btn-group m-b-10 chili-btn-group mantain-task">
    @if (session('g_mod') == 'Y')
        <button type="button" data-action="update" class="btn btn-info chili-btn chili-spaced full-rounded task-create">
            {{ trans('common.save') }}
        </button>
    @endif

    <button type="button" data-action="cancel" class="btn btn-primary chili-btn full-rounded spaced task-mutual">
        {{ trans('common.cancel') }}
    </button>
</div>
