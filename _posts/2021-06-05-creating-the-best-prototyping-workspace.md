---
title: Creating the Best Prototyping Workspace
tags: [Docker, Jupyter, Conda, Python]
style: fill # fill / border (choose one only)
color: info # primary / secondary / success / danger / warning / info / light / dark (choose one only)
description: Is it possible to have the perfect setup for fast prototyping in Python? I built a Docker image with Jupyter support in order to solve the most common problems.
layout: post
---

[![](https://img.shields.io/badge/GutHub-Davidelanz%2Fjupyter--docker-white)](https://github.com/Davidelanz/jupyter-docker)
[![](https://img.shields.io/badge/DockerHub-Davidelanz%2Fjupyter-blue)](https://hub.docker.com/r/davidelanz/jupyter)


<h2 id="contents"> Contents </h2>

- [Introduction](#introduction)
- [Mount the image from DockerHub](#mount-the-image-from-dockerhub)
- [Build from GitHub](#build-from-github)
- [Manage Conda environments](#manage-conda-environments)

## Introduction
[↑ back to contents ↑](#contents)

[Conda](https://docs.conda.io/en/latest/) and [Jupyter Lab](https://jupyter.org/) are probably the best combination for easily manage packages and test code snippets while prototyping, especially in Machine and Deep Learning fields.
For instance, some models could require [Tensorflow 1.15](https://www.tensorflow.org/versions/r1.15/api_docs/python/tf), others [Tensorflow 2.0](https://www.tensorflow.org/versions/r2.0/api_docs/python/tf), older ones [Caffe2](https://caffe2.ai/), or some other framework, and with such a setup, you can easily switch environments and python versions with a simple click. 


Since I am working a lot with [Docker](https://www.docker.com/) on remote servers, I need also a ready-to-use Docker image. Hence, I built an image integrating Jupyter, Conda, and some little tools which I think could provide the "best prototyping workspace" with a very low effort. Indeed, the [davidelanz/jupyter](https://hub.docker.com/r/davidelanz/jupyter) docker image provides a quick, dockerized setup for Jupyter Lab with multiple Conda environments.

|                                                                                                                                                                 | Features                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [![](https://raw.githubusercontent.com/Davidelanz/jupyter-docker/master/.docs/formatter.png)](https://jupyterlab-code-formatter.readthedocs.io/)                | The image comes with [jupyterlab_code_formatter](https://jupyterlab-code-formatter.readthedocs.io/) already installed                                        |
| [![](https://raw.githubusercontent.com/Davidelanz/jupyter-docker/master/.docs/lsp-integration.png)](https://jupyterlab-lsp.readthedocs.io/en/latest/index.html) | The image comes with [LSP Python language server for JupyterLab](https://jupyterlab-lsp.readthedocs.io/en/latest/index.html) (jedi 0.17.2) already installed |
| [![](https://raw.githubusercontent.com/Davidelanz/jupyter-docker/master/.docs/opencv.png)](https://opencv.org/)                                                 | The image comes already with a Python3.7 Conda environment with OpenCV support called ``opencv-py3.7``                                                       |

![](https://raw.githubusercontent.com/Davidelanz/jupyter-docker/master/.docs/banner.png)


## Mount the image from DockerHub
[↑ back to contents ↑](#contents)

Download the image from [davidelanz/jupyter](https://hub.docker.com/r/davidelanz/jupyter), 
then mount the container (the image exposes JupyterLab on the ``8888`` port):
```
docker pull davidelanz/jupyter
docker run \
    -p <CONTANER_PORT>:8888 \
    -v <EXTERNAL_FOLDER>:/workspace \
    --name <CONTAINER_NAME> davidelanz/jupyter
```

Your workspace will be available at ``http://localhost:<CONTANER_PORT>``.

## Build from GitHub
[↑ back to contents ↑](#contents)

The image can be directly built from the GitHub repository:

```
$ git clone https://github.com/davidelanz/jupyter-docker
$ cd jupyter-docker/
$ docker build . -t davidelanz/jupyter
```

## Manage Conda environments
[↑ back to contents ↑](#contents)

> The image comes already with a Python3.7 environment with OpenCV support called ``opencv-py3.7``.

You can create a new environment as follows (you can easily do it from the JupyterLab console):
```
conda create -y --name <DESIRED_ENV_NAME> python=<DESIRED_PYTHON_VERSION>
```
Then you can load it to JupyterLab as follows:
```
conda activate <DESIRED_ENV_NAME> && \
    conda install -y ipykernel && \
    python -m ipykernel install --name <DESIRED_ENV_NAME> --user
```

With Jupyter installed you get the list of currently installed kernels with:
```
jupyter kernelspec list
```

If you want to uninstall an unwanted kernel:
```
jupyter kernelspec uninstall <UNWANTED_KERNEL>
```

