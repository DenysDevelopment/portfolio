import { Item } from './Item';

import '../../styles/cardWork.scss';
import { AddItem } from './AddItem';

export const index = ({ works, addProject }: any) => {
	return (
		<ul className='card-work'>
			{works &&
				works.map((work: any, idx: any) => (
					<Item key={`${work.name}_${idx}`} {...work} />
				))}
			{addProject ? <AddItem /> : ''}
		</ul>
	);
};
