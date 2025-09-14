import { Wrap } from '@/styles/rootSection.styles';
import { useAppSelector } from '@/hooks/storeHooks';
import ElementRenderer from '@/components/lib/components/ElementRenderer';

const RootSection = () => {
  const elements = useAppSelector(state => state.elements);

	return (
		<Wrap>
      {Object.values(elements).map((data) => (
        <ElementRenderer key={data.id} data={data} />
      ))}
		</Wrap>
	);
};

export default RootSection;


