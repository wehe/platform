import { shallowMount } from '@vue/test-utils';
import 'src/app/component/form/field-base/sw-base-field';
import 'src/app/component/form/sw-checkbox-field';
import 'src/app/component/form/sw-switch-field';

const createWrapper = () => {
    const baseComponent = {
        template: `
            <div>
                <sw-switch-field v-model="checkOne" label="CheckOne"></sw-switch-field>
                <sw-switch-field v-model="checkTwo" label="CheckTwo"></sw-switch-field>
                <sw-switch-field v-model="checkThree" label="CheckThree"></sw-switch-field>
            </div>
        `,

        data() {
            return {
                checkOne: false,
                checkTwo: false,
                checkThree: false
            };
        }
    };

    return shallowMount(baseComponent, {
        stubs: {
            'sw-switch-field': Shopware.Component.build('sw-switch-field'),
            'sw-base-field': Shopware.Component.build('sw-base-field'),
            'sw-field-error': '<div></div>'
        }
    });
};

describe('app/component/form/sw-switch-field', () => {
    it('should be a Vue.js component', () => {
        const wrapper = createWrapper();

        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should render three switch fields', () => {
        const wrapper = createWrapper();

        const switchFields = wrapper.findAll('.sw-field--switch');

        expect(switchFields).toHaveLength(3);
    });

    it('should render all labels', () => {
        const wrapper = createWrapper();

        const switchFieldLabels = wrapper.findAll('.sw-field__label label');

        expect(switchFieldLabels).toHaveLength(3);

        expect(switchFieldLabels.at(0).text()).toContain('CheckOne');
        expect(switchFieldLabels.at(1).text()).toContain('CheckTwo');
        expect(switchFieldLabels.at(2).text()).toContain('CheckThree');
    });

    it('each label should refer to the matching input field', () => {
        const wrapper = createWrapper();

        const switchFieldLabels = wrapper.findAll('.sw-field__label label');

        const firstSwitchInputId = wrapper.find('input[name="sw-field--checkOne"]').attributes('id');
        const firstLabelFor = switchFieldLabels.at(0).attributes('for');
        expect(firstSwitchInputId).toMatch(firstLabelFor);

        const secondSwitchInputId = wrapper.find('input[name="sw-field--checkTwo"]').attributes('id');
        const secondLabelFor = switchFieldLabels.at(1).attributes('for');
        expect(secondSwitchInputId).toMatch(secondLabelFor);

        const thirdSwitchInputId = wrapper.find('input[name="sw-field--checkThree"]').attributes('id');
        const thirdLabelFor = switchFieldLabels.at(2).attributes('for');
        expect(thirdSwitchInputId).toMatch(thirdLabelFor);
    });

    it('the first label was clicked and the corresponding data updates', () => {
        const wrapper = createWrapper();

        expect(wrapper.vm.checkOne).toBeFalsy();
        wrapper.findAll('.sw-field__label label').at(0).trigger('click');
        expect(wrapper.vm.checkOne).toBeTruthy();
    });

    it('the first input was clicked and the corresponding data updates', () => {
        const wrapper = createWrapper();

        expect(wrapper.vm.checkOne).toBeFalsy();
        wrapper.find('input[name="sw-field--checkOne"]').trigger('click');
        expect(wrapper.vm.checkOne).toBeTruthy();
    });

    it('the second label was clicked and the corresponding data updates', () => {
        const wrapper = createWrapper();

        expect(wrapper.vm.checkTwo).toBeFalsy();
        wrapper.findAll('.sw-field__label label').at(1).trigger('click');
        expect(wrapper.vm.checkTwo).toBeTruthy();
    });

    it('the second input was clicked and the corresponding data updates', () => {
        const wrapper = createWrapper();

        expect(wrapper.vm.checkTwo).toBeFalsy();
        wrapper.find('input[name="sw-field--checkTwo"]').trigger('click');
        expect(wrapper.vm.checkTwo).toBeTruthy();
    });

    it('the third label was clicked and the corresponding data updates', () => {
        const wrapper = createWrapper();

        expect(wrapper.vm.checkThree).toBeFalsy();
        wrapper.findAll('.sw-field__label label').at(2).trigger('click');
        expect(wrapper.vm.checkThree).toBeTruthy();
    });

    it('the third input was clicked and the corresponding data updates', () => {
        const wrapper = createWrapper();

        expect(wrapper.vm.checkThree).toBeFalsy();
        wrapper.find('input[name="sw-field--checkThree"]').trigger('click');
        expect(wrapper.vm.checkThree).toBeTruthy();
    });
});
