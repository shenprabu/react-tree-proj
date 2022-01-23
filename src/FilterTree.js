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

    const searchedTreedata = () => {
        if(searchKey){
            const updatedTreedata = treedata.data.filter(cat => cat.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 || cat.options.some(opt => opt.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1))
            return {data: updatedTreedata}
        }
        return treedata
    }

    return(
        <div>
            <input onChange={e => setSearchKey(e.target.value)}/>
            <TreeView 
                defaultCollapseIcon={<ExpandMoreIcon />} 
                defaultExpandIcon={<ChevronRightIcon />} 
            >
                {searchedTreedata().data.map(category => 
                    <div key={category.name}>
                        <TreeItem nodeId={category.name} label={ 
                            <TextWithCheckbox 
                                text={category.name} 
                                id={category.id} 
                                level={category.level} 
                                checked={category.checked}
                            />
                        } >
                        {category.options.map(option => 
                            <div key={option.name}>
                                <TreeItem nodeId={option.name} label={
                                    <TextWithCheckbox 
                                        text={option.name} 
                                        id={option.id} 
                                        cat_id={category.id}
                                        level={option.level} 
                                        checked={option.checked}
                                    />
                                } />
                            </div>
                        )}
                        </TreeItem>
                    </div>
                )}
            </TreeView>
            
        </div>
    )
}

export default FilterTree;