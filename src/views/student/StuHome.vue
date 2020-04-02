<template>
    <div id="app">
        <v-app id="inspire">
            <v-stepper v-model="e1" :vertical="vertical" :alt-labels="altLabels">
                <v-stepper-header>
                    <v-stepper-step step="1">第一阶段：论文选题</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2">第二阶段：毕业论文需求分析</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">第三阶段：编码</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="4">第四阶段：中期审查</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="5">第五阶段：项目改进</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="6">第六阶段：论文答辩</v-stepper-step>
                </v-stepper-header>
                <v-stepper-content step="1">
                    现在所处阶段：论文选题
                </v-stepper-content>
            </v-stepper>
        </v-app>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                e1: 1,
                steps: 2,
                vertical: false,
                altLabels: true,
                editable: false,
            }
        },

        watch: {
            steps (val) {
                if (this.e1 > val) {
                    this.e1 = val
                }
            },
            vertical () {
                this.e1 = 2
                requestAnimationFrame(() => this.e1 = 1) // Workarounds
            },
        },

        methods: {
            onInput (val) {
                this.steps = parseInt(val)
            },
            nextStep (n) {
                if (n === this.steps) {
                    this.e1 = 1
                } else {
                    this.e1 = n + 1
                }
            },
        },
    }
</script>

<style scoped>

</style>