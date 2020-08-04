var bubble = Vue.extend({
    props: ['msg', 'sender', 'me', 'id'],
    template: `
        <div style="width: 100%; display: block; height: 64px">
            <p class="bubble-inside"  v-bind:class="{ isMe : sender == me }" @contextmenu="$emit('click',  $event, id)">
                {{sender}} :  {{msg}}
            </p>
            <br style="clear: both">
        </div>
    `
})

