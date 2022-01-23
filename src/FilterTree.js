import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useState } from "react";
import { useSelector } from 'react-redux';

import TextWithCheckbox from './comp/TextWithCheckbox';


function FilterTree(props) {

    const treedata = useSelector(state => state.treedata)

    const [searchKey, setSearchKey] = useState('')

    // tried to expand the node for searching a child
    /* const [expanded, setExpanded] = useState([])

    const nodeToggle = (event, catIds) => {
        setExpanded(catIds)
    } */

    const searchedTreedata = () => {
        if(searchKey){
            const updatedTreedata = treedata.data.filter(cat => cat.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || cat.options.some(opt => opt.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1))
            return {data: updatedTreedata}
        }
        return treedata
    }

    const onDragFun = (event) => {
        console.log(event)
    }

    return(
        <div>
            <TextWithCheckbox 
                // can use useState for searchedTreedata length
                checked={searchedTreedata().data.length && searchedTreedata().data.every(cat => cat.checked)}
                isSearch={true}
                searchKey={searchKey}
                onChange={e => setSearchKey(e.target.value)}
            />
            
            {searchedTreedata().data.length && 
            <TreeView 
                defaultCollapseIcon={<ExpandMoreIcon />} 
                defaultExpandIcon={<ChevronRightIcon />} 
                /* expanded={expanded}
                onNodeToggle={nodeToggle} */
            >
                {searchedTreedata().data.map(cat => 
                    <div key={cat.name}>
                        <TreeItem nodeId={'' + cat.id} label={ 
                            <TextWithCheckbox 
                                text={cat.name} 
                                id={cat.id} 
                                level={cat.level} 
                                checked={cat.checked}
                            />
                        } >
                        {cat.options.map(option => 
                            <div key={option.name}>
                                <TreeItem nodeId={option.name} label={
                                    <TextWithCheckbox 
                                        text={option.name} 
                                        id={option.id} 
                                        cat_id={cat.id}
                                        level={option.level} 
                                        checked={option.checked}
                                    />
                                } />
                            </div>
                        )}
                        </TreeItem>
                    </div>
                )}
            </TreeView> ||
            'No data found'}
            
        </div>
    )
}

export default FilterTree;