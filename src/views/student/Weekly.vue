<template>
    <div id="app">
        <v-tabs>
            <v-tab>总览</v-tab>
            <v-tab>添加周报</v-tab>
            <v-tab>查看周报</v-tab>
        </v-tabs>
        <v-app id="inspire">
            <v-timeline dense="true">
                <v-timeline-item
                        v-for="n in 3"
                        :key="n"
                        color="red lighten-2"
                        large
                >
                    <template v-slot:opposite>
                        <span>时间</span>
                    </template>
                    <v-card class="elevation-2">
                        <v-card-title class="headline">时间线标题</v-card-title>
                        <v-card-text>
                            时间线内容
                        </v-card-text>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "Weekly"
    }
</script>

<style scoped>

</style>