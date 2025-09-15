import { Wrap } from '@/styles/rootSection.styles';
import { useAppSelector } from '@/hooks/storeHooks';
import ElementRenderer from '@/components/lib/components/ElementRenderer';
import type { ElementsState } from '@/types/element.types';

const RootSection = () => {
  const elementsState = useAppSelector(state => state.elementsState);

  const elements = (() => {
    if (! elementsState) return {};
    const { _persist, ...cleanElements } =  elementsState as ElementsState;
    return cleanElements;
  })();

	return (
		<Wrap>
      {Object.values(elements).map((data) => (
        <ElementRenderer key={data.id} data={data} />
      ))}
		</Wrap>
	);
};

export default RootSection;


