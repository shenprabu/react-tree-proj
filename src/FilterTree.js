import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './styles/FilterTree.scss';

import TextWithCheckbox from './comp/TextWithCheckbox';
import SearchArea from './comp/SearchArea';
import DraggableItem from './comp/DraggableItem';


function FilterTree(props) {

    const treedata = useSelector(state => state.treedata)

    const [searchKey, setSearchKey] = useState('')

    // TODO - tried to expand the node for searching a child
    /* const [expanded, setExpanded] = useState([])

    const nodeToggle = (event, catIds) => {
        setExpanded(catIds)
    } */

    const searchTreedata = () => {
        if(searchKey){
            const updatedTreedata = [];

            treedata.data.forEach(cat => {
                if(cat.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1) {
                    updatedTreedata.push(cat)
                    return
                }
                const updatedOptions = cat.options.filter(opt => opt.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1)
                if(updatedOptions.length) {
                    updatedTreedata.push({...cat, options: updatedOptions})
                }
            })
            return {data: updatedTreedata}
        }
        return treedata
    }

    const searchedTreedata = {data: searchTreedata().data.map(cat => {
        cat.options.sort((a, b) => {
            return a.order > b.order ? 1 : -1
        })
        return cat
    })}

    const dispatch = useDispatch()

    const moveItem = (draggedId, newIndex, cat_id) => {
        dispatch({
            type: 'REORDER',
            draggedId, newIndex, cat_id
        })
    }

    return(
        <DndProvider backend={HTML5Backend}>
            <SearchArea 
                checked={searchedTreedata.data.length !== 0 && treedata.data.every(cat => cat.checked)}
                indeterminate={searchedTreedata.data.length !== 0 && 
                                treedata.data.some(cat => cat.indeterminate || cat.checked) && !treedata.data.every(cat => cat.checked)}
                isSearch={true}
                searchKey={searchKey}
                onSearch={e => setSearchKey(e.target.value)}    // TODO - implement debounce
                clearSearch={() => setSearchKey('')}
            />
            
            {searchedTreedata.data.length && 
            <TreeView 
                defaultCollapseIcon={<ExpandMoreIcon />} 
                defaultExpandIcon={<ChevronRightIcon />} 
                /* expanded={expanded}
                onNodeToggle={nodeToggle} */
            >
                {searchedTreedata.data.map(cat => 
                    <div key={cat.name}>
                        <TreeItem nodeId={'' + cat.id} label={ 
                            <TextWithCheckbox 
                                text={cat.name} 
                                id={cat.id} 
                                level={cat.level} 
                                checked={cat.checked}
                                indeterminate={cat.indeterminate}
                            />
                        } >
                        {cat.options.map(option => 
                            <DraggableItem 
                                key={option.name}
                                id={option.id} 
                                listId={cat.id} 
                                index={option.order}
                                moveItem={moveItem}
                            >
                                <TreeItem nodeId={option.name} onFocusCapture={e => e.stopPropagation()} label={
                                    <TextWithCheckbox 
                                        text={option.name} 
                                        id={option.id} 
                                        cat_id={cat.id}
                                        level={option.level} 
                                        checked={option.checked}
                                    />
                                } />
                            </DraggableItem>
                        )}
                        </TreeItem>
                    </div>
                )}
            </TreeView> ||
            <div className='nodata'> 'No data found' </div>}
            
        </DndProvider>
    )
}

export default FilterTree;