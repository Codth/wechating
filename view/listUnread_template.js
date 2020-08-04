var unread = Vue.extend({
    props: ['number', 'name'],

    template: `
        <div class="inner-list">
            <p style="margin-bottom: 0px">{{name}}</p>
            <div v-if="number > 0">
                <i class="fas fa-circle" style="color: red"></i>
                <span style="color: black"> [{{number}} messages]</span>
            </div>
        </div>
    `
})

