import { Wrap } from '@/styles/rootSection.styles';
import { useAppSelector } from '@/hooks/storeHooks';
import ElementRenderer from '@/components/lib/components/ElementRenderer';

const RootSection = () => {
  const elementsState = useAppSelector(state => state.elementsState);

	return (
		<Wrap>
      {Object.values(elementsState).map((data) => (
        <ElementRenderer key={data.id} data={data} />
      ))}
		</Wrap>
	);
};

export default RootSection;


