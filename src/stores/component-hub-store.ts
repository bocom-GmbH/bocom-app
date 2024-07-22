import { defineStore } from 'pinia';

//every used components are imported here
import CardCarousel from 'src/components/configurator/CardCarousel.vue';
import ImageCard from 'src/components/configurator/cards/ImageCard.vue';
import ArticleSelector from 'src/components/configurator/ArticleSelector.vue';
import InputFieldsCard from 'src/components/configurator/InputFieldsCard.vue';
import GroupingComponent from 'src/components/configurator/GroupingComponent.vue';
import MitarberiterCard from 'src/components/configurator/cards/MitarbeiterCard.vue';
import ProductCard from 'src/components/configurator/cards/ProductCard.vue';
import PromotionCard from 'src/components/configurator/cards/PromotionCard.vue';
import GroupingComponentSimple from 'src/components/configurator/GroupingComponentSimple.vue';
import { useQuery } from '@vue/apollo-composable';
import { getComponentHub } from 'src/apollo/queries/user';

interface ComponentPairs {
	componentId: string;
	component: any;
    requireMainConfigurator: boolean;
}

export const useComponentStore = defineStore('componentHub', {
	state: () => ({
        //this hub contains the components the front end should use by the component id
        //it also contains if the component need to use the main configurator or not
        hub: [] as ComponentPairs[],
	}),

	getters: {
        //returns the component by the component id
		getComponentById: (state) => (componentId: string) => {
			const componentPair = state.hub.find((pair) => pair.componentId === componentId);
			if (componentPair) {
				return componentPair.component;
			}
			return null;
		},
        //returns if the component needs the main configurator or not
        getRequireMainConfigurator: (state) => (componentId: string) => {
            const componentPair = state.hub.find((pair) => pair.componentId === componentId);
            if (componentPair) {
                return componentPair.requireMainConfigurator;
            }
            return false;
        }
	},

    actions: {
        getComponentHub () {
            const { onResult } = useQuery(
                getComponentHub,
                () => ({
                    errorPolicy: 'all',
                    fetchPolicy: 'no-cache'
                })
            );
        
            onResult((result) => {
                this.hub = result?.data?.getComponentHub;
                for (const item of result?.data?.getComponentHub) {
                    if (item.component === 'ImageCard') {
                        item.component = ImageCard;
                    } else if (item.component === 'ArticleSelector') {
                        item.component = ArticleSelector;
                    } else if (item.component === 'InputFieldsCard') {
                        item.component = InputFieldsCard;
                    } else if (item.component === 'GroupingComponent') {
                        item.component = GroupingComponent;
                    } else if (item.component === 'MitarbeiterCard') {
                        item.component = MitarberiterCard;
                    } else if (item.component === 'ProductCard') {
                        item.component = ProductCard;
                    } else if (item.component === 'PromotionCard') {
                        item.component = PromotionCard;
                    } else if (item.component === 'GroupingComponentSimple') {
                        item.component = GroupingComponentSimple;
                    } else if (item.component === 'CardCarousel') {
                        item.component = CardCarousel;
                    }
                }
            });
        }
    }
});
