import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useState } from "react";
import { useSelector } from 'react-redux';

import './styles/FilterTree.css';

import TextWithCheckbox from './comp/TextWithCheckbox';
import SearchArea from './comp/SearchArea';


function FilterTree(props) {

    const treedata = useSelector(state => state.treedata)

    const [searchKey, setSearchKey] = useState('')

    // TODO - tried to expand the node for searching a child
    /* const [expanded, setExpanded] = useState([])

    const nodeToggle = (event, catIds) => {
        setExpanded(catIds)
    } */

    const searchedTreedata = () => {
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

    const onDragFun = (event) => {
        console.log(event)
    }

    return(
        <div>
            <SearchArea 
                checked={searchedTreedata().data.length !== 0 && treedata.data.every(cat => cat.checked)}
                indeterminate={searchedTreedata().data.length !== 0 && 
                                treedata.data.some(cat => cat.indeterminate || cat.checked) && !treedata.data.every(cat => cat.checked)}
                isSearch={true}
                searchKey={searchKey}
                onSearch={e => setSearchKey(e.target.value)}    // TODO - implement debounce
                clearSearch={() => setSearchKey('')}
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
                                indeterminate={cat.indeterminate}
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
            <div className='nodata'> 'No data found' </div>}
            
        </div>
    )
}

export default FilterTree;