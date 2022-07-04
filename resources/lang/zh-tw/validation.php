<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ':attribute必須被接受。',
    'active_url'           => ':attribute不是有效的URL。',
    'after'                => ':attribute必須是今天之後的日期。',
    'after_or_equal'       => ':attribute必須是今天之後或等於的日期。',
    'alpha'                => ':attribute只能包含字母。',
    'alpha_dash'           => ':attribute只能包含字母，數字和-號。',
    'alpha_num'            => ':attribute只能包含字母和數字。',
    'array'                => ':attribute必須是陣列。',
    'before'               => ':attribute必須是今天之前的日期。',
    'before_or_equal'      => ':attribute必須是今天之前或等於的日期。',
    'between'              => [
        'numeric' => ':attribute必須介於:min和:max之間。',
        'file'    => ':attribute必須介於:min和:max Kbytes之間。',
        'string'  => ':attribute必須介於:min和:max 字元之間。',
        'array'   => ':attribute必須介於:min和:max items之間。',
    ],
    'boolean'              => ':attribute必須為true或false。',
    'confirmed'            => ':attribute確認資訊不相同。',
    'date'                 => ':attribute不是有效日期。',
    'date_format'          => ':attribute與格式不匹配。',
    'different'            => ':attribute必須是不同的。',
    'digits'               => ':attribute必須是數字。',
    'digits_between'       => ':attribute必須介於:min和:max 之間。',
    'dimensions'           => ':attribute具有無效的圖像尺寸。',
    'distinct'             => ':attribute具有重複值。',
    'email'                => ':attribute必須是有效的電子郵件地址。',
    'exists'               => '選取的:attribute無效。',
    'file'                 => '必須是文件。',
    'filled'               => '字段必須具有值。',
    'image'                => '必須是圖像。',
    'in'                   => '無效。',
    'in_array'             => '字段不存在。',
    'integer'              => '必須是整數。',
    'ip'                   => '必須是有效的IP地址。',
    'ipv4'                 => '必須是有效的IPv4地址。',
    'ipv6'                 => '必須是有效的IPv6地址。',
    'json'                 => '必須是有效的JSON字符串。',
    'max'                  => [
        'numeric' => ':attribute不得大於:max。',
        'file'    => ':attribute不得大於:max Kbytes。',
        'string'  => ':attribute不得大於:max 字符數。',
        'array'   => ':attribute可能不超過:max 項目',
    ],
    'mimes'                => ':attribute必須是文件格式 type: :values.',
    'mimetypes'            => ':attribute必須是文件格式 type: :values.',
    'min'                  => [
        'numeric' => ':attribute必須至少為:min。',
        'file'    => ':attribute必須至少為:min Kbytes。',
        'string'  => ':attribute必須至少為:min 字元。',
        'array'   => ':attribute必須至少包含:min 項。',
    ],
    'not_in'               => ':attribute無效。',
    'numeric'              => ':attribute必須是數字。',
    'present'              => ':attribute字段必須存在。',
    'regex'                => ':attribute格式無效。',
    'required'             => ':attribute字段是必需的。',
    'required_if'          => ':attribute在以下情況下需要:attribute字段:other是:value。',
    'required_unless'      => ':attribute字段是必需的，除非:other在:values中。',
    'required_with'        => ':attribute在以下情況下需要:attribute字段:values存在。',
    'required_with_all'    => ':attribute在以下情況下需要:attribute字段:values存在。',
    'required_without'     => ':attribute在以下情況下需要:attribute字段:values不存在。',
    'required_without_all' => ':attribute當沒有:values存在時，:attribute字段是必需的。',
    'same'                 => ':attribute和:other必須匹配。',
    'size'                 => [
        'numeric' => ':attribute必須是:size。',
        'file'    => ':attribute必須是:size kBytes。',
        'string'  => ':attribute必須是:size 字元。',
        'array'   => ':attribute必須包含:size 項目。',
    ],
    'string'               => ':attribute 必須是一個字串。',
    'timezone'             => ':attribute 必須是有效的時間。',
    'unique'               => ':attribute 必須唯一有效值。',
    'uploaded'             => ':attribute 上傳失敗。',
    'url'                  => ':attribute URL格式錯誤。',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
