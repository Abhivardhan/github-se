import React from 'react';
import Search from './components/Search';
import UserCard from './components/UserCard';
import RepoCard from './components/RepoCard';

const PAGE_SIZE = 10;

class App extends React.Component {

    state = {
        user: null,
        repos: [],
        pageIndex: 1,
        userDataError: null,
        reposError: null,
        error: null,
        loader: false,
        fetchingRepos: false
    };

    fetchUserData = async (username) => {
        let res = await fetch(`https://api.github.com/users/${username}`);
    
        if(res.ok) {
        let data = await res.json();

        return {data};
        }

        const error = (await res.json()).message;

        return {error};

    }

    fetchUserRepos = async (username) => {

        let pageIndex = this.state.pageIndex;

        let res = await fetch(`https://api.github.com/users/${username}/repos?page=${pageIndex}&per_page=${PAGE_SIZE}`);
    
        if(res.ok) {
        let data = await res.json();

        return {data, pageIndex: pageIndex + 1};
        }

        const error = (await res.json()).message;

        return {error};
    }

    fetchData = async (username) => {
        this.setState({loader: true}, async () => {
        try {
            let [user, repos] = await Promise.all([this.fetchUserData(username), this.fetchUserRepos(username)]);

            if(user.data && repos.data) {
                return this.setState({
                    user: user.data,
                    repos: repos.data,
                    pageIndex: 2,
                    loader: false
                });
            }

            this.setState({
                userDataError: user.error,
                reposError: repos.error,
                loader: false
            });

        } catch(err) {
            this.setState({
            error: "There was some error",
            loader: true
            });
        }
        });
    }

    loadMore = async () => {
        let { repos } = this.state;
        let {data, pageIndex} = await this.fetchUserRepos(this.state.user.login);

        if(data) {
            this.setState(state => ({
                repos: [...state.repos, ...data],
                pageIndex
            }));
        }
        
    }

    loadPage = async () => {
        if(this.state.fetchingRepos) return;

        this.setState({ fetchingRepos: true}, async () => {
            let {data} = await this.fetchUserRepos(
                this.state.user.login
            );
        
            if(data) {
                this.setState(state => ({
                    repos: [...state.repos, ...data],
                    pageIndex: state.pageIndex + 1,
                    fetchingRepos: false
                }));
            }
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);   
    }

    handleScroll = () => {
        let currentScroll = window.scrollY;
        let maxScroll = window.scrollMaxY || document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let {pageIndex, user} = this.state;


        if(user && ((pageIndex -1) * PAGE_SIZE <= user.public_repos) && (maxScroll - currentScroll <= 100)) {
            this.loadPage();
        }

    }

    render() {
        let { loader, user, repos, pageIndex, userDataError, reposError, error} = this.state;
        
        if(error) {
            console.log(error)
        }

        return (
        <div>
            <Search fetchData={this.fetchData}/>
            {loader && <p>Loading....</p>}
            {userDataError && <p className="text-danger">{userDataError}</p>}
            {!userDataError &&  user && <UserCard user={user}/> }
            {reposError && <p className="text-danger">{reposError}</p>}
            {!reposError &&  repos && repos.map((repo) => <RepoCard key={repo.id} repo={repo}/> )}
        </div>
        );
    }
}

export default App;
