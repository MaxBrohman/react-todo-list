import {TKeydownCallback, TOnKeyDown} from '../typings/utils';

// decorator for keydown event
const onKeydownHelper = (id: number, key: string, onKeyDown: TKeydownCallback): TOnKeyDown => (evt) => {
    if (evt.key === key) {
        evt.preventDefault();
        onKeyDown(id);
    }
};

export default onKeydownHelper;