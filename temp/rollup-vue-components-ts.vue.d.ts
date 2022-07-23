import { Vue } from 'vue-property-decorator';
export default class RollupVueComponentsTs extends Vue {
    static install(vue: typeof Vue): void;
    name: string;
}
