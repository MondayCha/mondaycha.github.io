## Lab 3 执行结果

```
2023-11-22 19:33:26 - [INFO] The remote host is connected.
2023-11-22 19:33:26 - [INFO] No dump information is configured
2023-11-22 19:33:26 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/out/out.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/out/" on the remote host.
2023-11-22 19:33:26 - [INFO] Send compressed file success.
2023-11-22 19:33:27 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/out/out.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/out/" on the remote host.
2023-11-22 19:33:27 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/out/acl.json.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/src/" on the remote host.
2023-11-22 19:33:27 - [INFO] Send compressed file success.
2023-11-22 19:33:27 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/out/acl.json.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/src/" on the remote host.
2023-11-22 19:33:27 - [INFO] Renaming "main" on the remote host to "workspace_mind_studio_MyApp".
2023-11-22 19:33:27 - [INFO] Assigning execute permission to workspace_mind_studio_MyApp on the remote host.
2023-11-22 19:33:27 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/data/data.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/data/" on the remote host.
2023-11-22 19:33:28 - [INFO] Send compressed file success.
2023-11-22 19:33:28 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/data/data.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/data/" on the remote host.
2023-11-22 19:33:28 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/model/model.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/model/" on the remote host.
2023-11-22 19:33:30 - [INFO] Send compressed file success.
2023-11-22 19:33:37 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/model/model.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/model/" on the remote host.
2023-11-22 19:33:37 - [INFO] Start running "workspace_mind_studio_MyApp" on the remote host.
2023-11-22 19:33:37 - [INFO] There is no dump path and no need to dump.
2023-11-22 19:33:37 - [INFO] Synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/MyApp/out/run.sh" to "~/HIAI_PROJECTS/workspace_mind_studio/MyApp_20950d75/out/" on the remote host.
2023-11-22 19:33:37 - [INFO] Assigning execute permission to run.sh on the remote host.
[INFO]  acl init success
[INFO]  open device 0 success
[INFO]  create context success
[INFO]  create stream success
[INFO]  get run mode success
[INFO]  load model ../model/resnet50.om success
[INFO]  create model description success
[INFO]  create model output success
[INFO]  start to process file:../data/dog1_1024_683.bin
[INFO]  model execute success
[INFO]  top 1: index[161] value[0.763672]
[INFO]  top 2: index[162] value[0.157593]
[INFO]  top 3: index[167] value[0.039215]
[INFO]  top 4: index[163] value[0.021835]
[INFO]  top 5: index[166] value[0.011871]
[INFO]  output data success
[INFO]  start to process file:../data/dog2_1024_683.bin
[INFO]  model execute success
[INFO]  top 1: index[267] value[0.935547]
[INFO]  top 2: index[266] value[0.041107]
[INFO]  top 3: index[265] value[0.018967]
[INFO]  top 4: index[219] value[0.002865]
[INFO]  top 5: index[160] value[0.000311]
[INFO]  output data success
[INFO]  unload model success, modelId is 1
[INFO]  execute sample success
[INFO]  end to destroy stream
[INFO]  end to destroy context
[INFO]  end to reset device is 0
[INFO]  end to finalize acl

2023-11-22 19:33:38 - [INFO] Running "workspace_mind_studio_MyApp" on the remote host finished.
```

## Lab 4

### Lab 3 ATC 模型转换失败

```
atc --model=googlenet.prototxt --weight=googlenet.caffemodel --framework=0 --output=googlenet --soc_version=Ascend310 --input_shape="data:1,3,224,224" --insert_op_conf=aipp.cfg
```

发现是复制环境变量的时候少了个「-」……

### 实验 6 执行结果

```
2023-11-22 19:55:00 - [INFO] The remote host is connected.
2023-11-22 19:55:00 - [INFO] No dump information is configured
2023-11-22 19:55:00 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/out/out.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/out/" on the remote host.
2023-11-22 19:55:01 - [INFO] Send compressed file success.
2023-11-22 19:55:01 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/out/out.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/out/" on the remote host.
2023-11-22 19:55:01 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/out/acl.json.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/src/" on the remote host.
2023-11-22 19:55:01 - [INFO] Send compressed file success.
2023-11-22 19:55:01 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/out/acl.json.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/src/" on the remote host.
2023-11-22 19:55:01 - [INFO] Renaming "main" on the remote host to "workspace_mind_studio_classification".
2023-11-22 19:55:01 - [INFO] Assigning execute permission to workspace_mind_studio_classification on the remote host.
2023-11-22 19:55:02 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/data/data.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/data/" on the remote host.
2023-11-22 19:55:02 - [INFO] Send compressed file success.
2023-11-22 19:55:02 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/data/data.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/data/" on the remote host.
2023-11-22 19:55:02 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/model/model.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/model/" on the remote host.
2023-11-22 19:55:03 - [INFO] Send compressed file success.
2023-11-22 19:55:03 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/model/model.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/model/" on the remote host.
2023-11-22 19:55:03 - [INFO] Start running "workspace_mind_studio_classification" on the remote host.
2023-11-22 19:55:03 - [INFO] Synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/out/run.sh" to "~/HIAI_PROJECTS/workspace_mind_studio/classification_d944cac0/out/" on the remote host.
2023-11-22 19:55:03 - [INFO] There is no dump path and no need to dump.
2023-11-22 19:55:04 - [INFO] Assigning execute permission to run.sh on the remote host.
[INFO]  Acl init success
[INFO]  Open device 0 success
[INFO]  load model ../model/googlenet.om success
[INFO]  create model description success
[INFO]  create model output success
[INFO]  Read image ../data/dog1_1024_683.jpg
[INFO]  Resize image ../data/dog1_1024_683.jpg
[INFO]  model execute success
[INFO]  top 1: index[162] value[0.896484]
[INFO]  top 2: index[166] value[0.041931]
[INFO]  top 3: index[161] value[0.033417]
[INFO]  top 4: index[167] value[0.024841]
[INFO]  top 5: index[163] value[0.001316]
[INFO]  ../data/dog1_1024_683.jpg --> beagle
[INFO]  Read image ../data/dog2_1024_683.jpg
[INFO]  Resize image ../data/dog2_1024_683.jpg
[INFO]  model execute success
[INFO]  top 1: index[267] value[0.576172]
[INFO]  top 2: index[265] value[0.182739]
[INFO]  top 3: index[266] value[0.161377]
[INFO]  top 4: index[355] value[0.008614]
[INFO]  top 5: index[279] value[0.007725]
[INFO]  ../data/dog2_1024_683.jpg --> standard poodle
[INFO]  Read image ../data/rabit.jpg
[INFO]  Resize image ../data/rabit.jpg
[INFO]  model execute success
[INFO]  top 1: index[330] value[0.624512]
[INFO]  top 2: index[331] value[0.373047]
[INFO]  top 3: index[332] value[0.002289]
[INFO]  top 4: index[104] value[0.000003]
[INFO]  top 5: index[106] value[0.000001]
[INFO]  ../data/rabit.jpg --> wood rabbit, cottontail, cottontail rabbit
[INFO]  Execute sample success
[INFO]  end to destroy stream
[INFO]  end to destroy context
[INFO]  end to reset device is 0
[INFO]  end to finalize acl
[INFO]  unload model success, modelId is 1

2023-11-22 19:55:05 - [INFO] Start transferring result files to Mind Studio.
2023-11-22 19:55:06 - [INFO] Result files have been transferred to Mind Studio.
2023-11-22 19:55:06 - [INFO] Result files are saved in "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/classification/out/outputs/20231122195505".
2023-11-22 19:55:06 - [INFO] Running "workspace_mind_studio_classification" on the remote host finished.
```

### 实验 7 执行结果

```
2023-11-22 20:06:40 - [INFO] The remote host is connected.
2023-11-22 20:06:41 - [INFO] No dump information is configured
2023-11-22 20:06:41 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/out/out.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/out/" on the remote host.
2023-11-22 20:06:41 - [INFO] Send compressed file success.
2023-11-22 20:06:41 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/out/out.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/out/" on the remote host.
2023-11-22 20:06:41 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/out/acl.json.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/src/" on the remote host.
2023-11-22 20:06:41 - [INFO] Send compressed file success.
2023-11-22 20:06:41 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/out/acl.json.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/src/" on the remote host.
2023-11-22 20:06:41 - [INFO] Renaming "main" on the remote host to "workspace_mind_studio_objectdetection".
2023-11-22 20:06:42 - [INFO] Assigning execute permission to workspace_mind_studio_objectdetection on the remote host.
2023-11-22 20:06:42 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/data/data.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/data/" on the remote host.
2023-11-22 20:06:42 - [INFO] Send compressed file success.
2023-11-22 20:06:42 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/data/data.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/data/" on the remote host.
2023-11-22 20:06:42 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/model/model.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/model/" on the remote host.
2023-11-22 20:06:48 - [INFO] Send compressed file success.
2023-11-22 20:06:54 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/model/model.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/model/" on the remote host.
2023-11-22 20:06:54 - [INFO] Start running "workspace_mind_studio_objectdetection" on the remote host.
2023-11-22 20:06:54 - [INFO] There is no dump path and no need to dump.
2023-11-22 20:06:54 - [INFO] Synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/out/run.sh" to "~/HIAI_PROJECTS/workspace_mind_studio/objectdetection_6a273a01/out/" on the remote host.
2023-11-22 20:06:54 - [INFO] Assigning execute permission to run.sh on the remote host.
[INFO]  acl init success
[INFO]  open device 0 success
[INFO]  create context success
[INFO]  create stream success
[INFO]  load model ../model/yolov3.om success
[INFO]  create model description success
[INFO]  create model output success
[INFO]  dvpp init resource ok
[INFO]  convert image success
[INFO]  model execute success
[INFO]  left_top point (x, y) = (115, 116); right_bottom (x, y) = (926, 598); Confidence: dog99%
[INFO]  convert image success
[INFO]  model execute success
[INFO]  left_top point (x, y) = (48, 110); right_bottom (x, y) = (474, 261); Confidence: boat99%
[INFO]  Execute sample success
[INFO]  unload model success, modelId is 1
[INFO]  end to destroy stream
[INFO]  end to destroy context
[INFO]  end to reset device is 0
[INFO]  end to finalize acl

2023-11-22 20:06:56 - [INFO] Start transferring result files to Mind Studio.
2023-11-22 20:06:57 - [INFO] Result files have been transferred to Mind Studio.
2023-11-22 20:06:57 - [INFO] Result files are saved in "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/objectdetection/out/outputs/20231122200656".
2023-11-22 20:06:57 - [INFO] Running "workspace_mind_studio_objectdetection" on the remote host finished.
```

## MNIST 实验结果

```
2023-11-28 22:48:35 - [INFO] The remote host is connected.
2023-11-28 22:48:35 - [INFO] No dump information is configured
2023-11-28 22:48:35 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/mnist/out/out.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/mnist_94f0402e/out/" on the remote host.
2023-11-28 22:48:35 - [INFO] Send compressed file success.
2023-11-28 22:48:35 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/mnist/out/out.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/mnist_94f0402e/out/" on the remote host.
2023-11-28 22:48:36 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/mnist/out/acl.json.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/mnist_94f0402e/src/" on the remote host.
2023-11-28 22:48:36 - [INFO] Send compressed file success.
2023-11-28 22:48:36 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/mnist/out/acl.json.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/mnist_94f0402e/src/" on the remote host.
2023-11-28 22:48:36 - [INFO] Renaming "main" on the remote host to "workspace_mind_studio_mnist".
2023-11-28 22:48:36 - [INFO] Assigning execute permission to workspace_mind_studio_mnist on the remote host.
2023-11-28 22:48:36 - [INFO] The path "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/mnist/data" of the same content is found on the remote host. No copy is needed.
2023-11-28 22:48:37 - [INFO] Start synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/mnist/model/model.tar" to "~/HIAI_PROJECTS/workspace_mind_studio/mnist_94f0402e/model/" on the remote host.
2023-11-28 22:48:37 - [INFO] Send compressed file success.
2023-11-28 22:48:37 - [INFO] "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/mnist/model/model.tar" has been synchronized to "~/HIAI_PROJECTS/workspace_mind_studio/mnist_94f0402e/model/" on the remote host.
2023-11-28 22:48:37 - [INFO] Start running "workspace_mind_studio_mnist" on the remote host.
2023-11-28 22:48:37 - [INFO] There is no dump path and no need to dump.
2023-11-28 22:48:37 - [INFO] Synchronizing "/var/www/atlas200dk/ascend/project/_2023Nov22Wed113139/mnist/out/run.sh" to "~/HIAI_PROJECTS/workspace_mind_studio/mnist_94f0402e/out/" on the remote host.
2023-11-28 22:48:37 - [INFO] Assigning execute permission to run.sh on the remote host.
[INFO]  acl init success
[INFO]  open device 0 success
[INFO]  create context success
[INFO]  create stream success
[INFO]  get run mode success
[INFO]  load model ../model/frozen_model_tf1.om success
[INFO]  create model description success
[INFO]  create model output success
[INFO]  start to process file:../data/0.bin
[INFO]  model execute success
[INFO]  top 1: index[0] value[1666.000000]
[INFO]  top 2: index[5] value[955.000000]
[INFO]  top 3: index[2] value[339.750000]
[INFO]  top 4: index[9] value[-315.000000]
[INFO]  top 5: index[3] value[-328.250000]
[INFO]  output data success
[INFO]  start to process file:../data/1.bin
[INFO]  model execute success
[INFO]  top 1: index[1] value[1538.000000]
[INFO]  top 2: index[7] value[66.437500]
[INFO]  top 3: index[3] value[-136.625000]
[INFO]  top 4: index[9] value[-210.375000]
[INFO]  top 5: index[8] value[-229.000000]
[INFO]  output data success
[INFO]  start to process file:../data/2.bin
[INFO]  model execute success
[INFO]  top 1: index[2] value[1969.000000]
[INFO]  top 2: index[3] value[1531.000000]
[INFO]  top 3: index[1] value[147.500000]
[INFO]  top 4: index[8] value[-40.812500]
[INFO]  top 5: index[0] value[-306.500000]
[INFO]  output data success
[INFO]  start to process file:../data/3.bin
[INFO]  model execute success
[INFO]  top 1: index[3] value[2860.000000]
[INFO]  top 2: index[5] value[1258.000000]
[INFO]  top 3: index[9] value[165.625000]
[INFO]  top 4: index[1] value[117.250000]
[INFO]  top 5: index[8] value[91.625000]
[INFO]  output data success
[INFO]  start to process file:../data/4.bin
[INFO]  model execute success
[INFO]  top 1: index[4] value[1636.000000]
[INFO]  top 2: index[9] value[1109.000000]
[INFO]  top 3: index[3] value[636.000000]
[INFO]  top 4: index[7] value[597.000000]
[INFO]  top 5: index[5] value[-24.796875]
[INFO]  output data success
[INFO]  start to process file:../data/5.bin
[INFO]  model execute success
[INFO]  top 1: index[5] value[1331.000000]
[INFO]  top 2: index[3] value[1208.000000]
[INFO]  top 3: index[8] value[373.250000]
[INFO]  top 4: index[1] value[-32.500000]
[INFO]  top 5: index[6] value[-38.375000]
[INFO]  output data success
[INFO]  start to process file:../data/6.bin
[INFO]  model execute success
[INFO]  top 1: index[6] value[1015.500000]
[INFO]  top 2: index[5] value[811.000000]
[INFO]  top 3: index[1] value[400.750000]
[INFO]  top 4: index[2] value[65.687500]
[INFO]  top 5: index[3] value[18.734375]
[INFO]  output data success
[INFO]  start to process file:../data/7.bin
[INFO]  model execute success
[INFO]  top 1: index[7] value[1291.000000]
[INFO]  top 2: index[3] value[1155.000000]
[INFO]  top 3: index[2] value[724.500000]
[INFO]  top 4: index[1] value[456.750000]
[INFO]  top 5: index[9] value[256.000000]
[INFO]  output data success
[INFO]  start to process file:../data/8.bin
[INFO]  model execute success
[INFO]  top 1: index[3] value[1217.000000]
[INFO]  top 2: index[8] value[975.500000]
[INFO]  top 3: index[2] value[414.500000]
[INFO]  top 4: index[1] value[170.750000]
[INFO]  top 5: index[9] value[-377.250000]
[INFO]  output data success
[INFO]  start to process file:../data/9.bin
[INFO]  model execute success
[INFO]  top 1: index[9] value[1602.000000]
[INFO]  top 2: index[7] value[596.500000]
[INFO]  top 3: index[3] value[563.000000]
[INFO]  top 4: index[2] value[91.250000]
[INFO]  top 5: index[4] value[87.000000]
[INFO]  output data success
[INFO]  unload model success, modelId is 1
[INFO]  execute sample success
[INFO]  end to destroy stream
[INFO]  end to destroy context
[INFO]  end to reset device is 0
[INFO]  end to finalize acl

2023-11-28 22:48:39 - [INFO] Running "workspace_mind_studio_mnist" on the remote host finished.

```
