<div class="btn-group m-b-10 chili-btn-group mantain-task">
    <button type="button" data-action="verifyPass" class="btn btn-info chili-btn full-rounded spaced task-create">
        {{ trans('common.verifyPass') }}
    </button>

    <button type="button" data-action="verifyNoPass" class="btn btn-info chili-btn full-rounded spaced task-search ">
        {{ trans('common.verifyNoPass') }}
    </button>

    <button type="button" data-action="cancel" class="btn btn-primary chili-btn full-rounded spaced task-mutual">
        {{ trans('common.cancel') }}
    </button>

    <input type="hidden" name="_verifyType" id="_verifyType" value="">
</div>
