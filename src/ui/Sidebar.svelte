<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import type {BibTeXTidyResult} from "../index.ts";
    import type {OptionsNormalized} from "../optionUtils.ts";
    import Feedback from "./Feedback.svelte";

    export let status:
        | { status: "success"; result: BibTeXTidyResult }
        | { status: "error"; error: unknown }
        | undefined;
    export let running: boolean;
    export let options: OptionsNormalized;

    let dispatch = createEventDispatcher<{ tidy: undefined }>();
</script>

<aside id="sidebar">
    <form on:submit={() => false}>
        <header class="intro">
            <h1>BibTeX Tidy</h1>
            <p>
                This tool tidies bibtex files for the specific use for the Bibtex Reference Generator or Manager.
            </p>
            <p>
                <a class="btn" href="https://github.com/liliana-sanfilippo/bibtex-tidy">
                    Github
                </a>
                <a
                        class="btn"
                        href="https://github.com/liliana-sanfilippo/bibtex-tidy/issues"
                >
                    Report a bug or request a feature
                </a>
            </p>
            <p>
                <a
                        class="btn"
                        href="https://github.com/liliana-sanfilippo/react-bibtex-reference-generator/wiki/Manual"
                >
                    Go to the Bibtex Reference Generator
                </a>
            </p>
            <p>
                <a
                        class="btn"
                        href="https://github.com/liliana-sanfilippo/react-bibtex-reference-manager/wiki/Manual-for-iGEM-Wikis"
                >
                    Go to the Bibtex Reference Manager
                </a>
            </p>
            <p>The following things are done:</p>
            <ul>
                <li>
                    Remove any curly braces within the value, unless they are part of a command.
                </li>
                <li>
                    Convert all months to three letter abbreviations (jan, feb, etc).
                </li>
                <li>
                    Enclose all property values in braces. Quoted values will be converted to braces.
                </li>
                <li>
                    Indent all fields.
                </li>
                <li>
                    Insert whitespace between fields and values so that values are visually aligned.
                </li>
                <li>
                    Where an entire value is enclosed in double braces, remove the extra braces.
                </li>
                <li>
                    Where values are all caps, make them title case and lowercase field names and entry type.
                </li>
                <li>
                    Remove any fields that have empty values.
                </li>
                <li>
                    Generate citation keys.
                </li>
                <li>
                    Remove any curly braces within the title, unless they are part of a command.
                </li>
            </ul>
        </header>

        <!--
        <IndentOptions bind:options />
        <WhitespaceOptions bind:options />
        <ValueOptions bind:options />
        <SortingOptions bind:options />
        <DuplicateOptions bind:options />
        <CleanupOptions bind:options />
        <Cli {options} />
        -->

    </form>

    <div class="run">
        {#if status}
            <Feedback {options} {status}/>
        {/if}
        <button id="tidy" disabled={running} on:click={() => dispatch('tidy')}>
            Tidy
        </button>
    </div>
</aside>

<style>
    #sidebar {
        flex: 0 0 400px;
        border-left: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        scrollbar-gutter: stable;
    }

    #sidebar form {
        flex: 1 1 auto;
        padding: 20px;
        overflow: auto;
    }

    #sidebar h1 {
        font: var(--sans-h1);
        color: var(--header-fg);
        margin: 0 0 16px 0;
        padding: 0;
    }

    .intro {
        margin-bottom: 20px;
    }

    #sidebar .run {
        flex: 0 0 auto;
        padding: 20px;
        border-top: 1px solid var(--border-color);
    }

    #sidebar #tidy {
        background: var(--light-blue);
        border: 0;
        color: var(--main-bg);
        font: var(--sans-h1);
        font-size: 15px;
        height: 36px;
        width: 100%;
        border-radius: 3px;
        position: relative;
    }

    #sidebar #tidy[disabled] {
        background: var(--dark-gray);
        color: transparent;
        position: relative;
    }

    #sidebar #tidy[disabled]:after {
        animation: pulse 0.9s infinite linear;
        animation-delay: -0.45s;
        background: #fff;
        border-radius: 50%;
        content: '';
        height: 20px;
        left: 160px;
        position: absolute;
        top: 8px;
        width: 20px;
    }

    #sidebar :global(code) {
        font-size: 0.9em;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(0, 0, 0, 0.1);
        color: var(--light-gray);
        padding: 1px 4px;
        border-radius: 3px;
    }

    @keyframes pulse {
        0% {
            transform: translateX(-80px) scale(0);
        }
        35% {
            transform: translateX(-40px) scale(0.85);
        }
        50% {
            transform: translateX(0px) scale(1);
        }
        65% {
            transform: translateX(40px) scale(0.85);
        }
        100% {
            transform: translateX(80px) scale(0);
        }
    }
</style>
