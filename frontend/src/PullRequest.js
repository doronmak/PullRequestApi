import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';


import TextField from '@material-ui/core/TextField';

export class PullRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {},
            numberSorter: 0,
            titleSorter: 0,
        }
        this.filterPr = this.filterPr.bind(this)
        this.filterLableChange = this.filterLableChange.bind(this)
        this.filterStatusChange = this.filterStatusChange.bind(this)
        this.sortPr = this.sortPr.bind(this)
    }

    filterLableChange(event) {
        let last = this.state.filters
        last.lable = event.target.value
        this.setState({ filters: last })
    }

    filterStatusChange(event) {
        let last = this.state.filters
        last.PRStatus = event.target.value
        this.setState({ filters: last })
    }

    sortPr(pr1, pr2) {
        if (this.state.sortBy === "number") {
            if (this.state.numberSorter % 2) {
                return (pr1.number - pr2.number)
            }
            return (pr2.number - pr1.number)
        }
        if (this.state.sortBy === "title") {

            if (this.state.titleSorter % 2)
                return (pr1.title > pr2.title) ? 1 : -1
            return (pr1.title <= pr2.title) ? 1 : -1

        }
        return 0
    }

    filterPr(data) {
        if (this.state.filters.PRStatus !== undefined && this.state.filters.PRStatus !== "") {
            if (data.status !== this.state.filters.PRStatus)
                return false
        }
        if (this.state.filters.lable !== undefined && this.state.filters.lable !== "") {
            if (!data.labels.includes(this.state.filters.lable))
                return false
        }
        return true
    }

    render() {
        let filteredToShow = this.props.all_prs.filter(this.filterPr).sort(this.sortPr)
        return (
            <div style={{ width: '80%', margin: 'auto' }}>
                <div style={{ textAlign: 'left', height: '70px' }}>
                    <span style={{ margin: "50px" }}>
                        <span style={{ paddingTop: "26px", display: 'inline-block' }}>choose filter</span>
                    </span>
                    <span style={{ margin: "50px" }}>
                        <TextField onChange={this.filterLableChange} label={"Filter By Lable"}></TextField>
                    </span>
                    <span style={{ margin: "50px" }}>
                        <TextField onChange={this.filterStatusChange} label={"Filter By Status"}></TextField>
                    </span>
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "lightblue" }}>
                                    <TableCell onClick={() => {
                                        this.setState({ sortBy: "title", titleSorter: this.state.titleSorter + 1 })
                                    }}><b>Title</b>
                                        <IconButton aria-label="sort" size="small">
                                            <ArrowDownwardIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left" onClick={() => {
                                        this.setState({ sortBy: "number", numberSorter: this.state.numberSorter + 1 })
                                    }}><b>PR number</b>   <IconButton aria-label="sort" size="small">
                                            <ArrowDownwardIcon fontSize="inherit" />
                                        </IconButton></TableCell>
                                    <TableCell align="left"><b>Description</b></TableCell>
                                    <TableCell align="left"><b>Author</b></TableCell>
                                    <TableCell align="left"><b>Status</b></TableCell>
                                    <TableCell align="left"><b>Lables</b></TableCell>
                                    <TableCell align="left"><b>Creation Date</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredToShow.map((pr) => (
                                    <TableRow key={pr.number}>
                                        <TableCell component="th" scope="row">
                                            {pr.title}
                                        </TableCell>
                                        <TableCell align="left">{pr.number}</TableCell>
                                        <TableCell align="left">{pr.description}</TableCell>
                                        <TableCell align="left">{pr.author}</TableCell>
                                        <TableCell align="left">{pr.status}</TableCell>
                                        <TableCell align="left">
                                            {pr.labels.map((label) =>
                                                <span key={label}>{label},</span>
                                            )}
                                        </TableCell>
                                        <TableCell align="left">{pr.creation_time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}